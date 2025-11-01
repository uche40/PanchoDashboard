// ==================== GLOBAL STATE ====================
let appSettings = null;
let isSidebarExpanded = false;
let openSubmenus = new Set();
let isMobile = false;
let isMobileMenuOpen = false;
let isHovering = false;

// ==================== DOM ELEMENT REFERENCES ====================
const sidebarContainer = document.getElementById('sidebar-container');
const mainContent = document.getElementById('main-content');
const mobileBackdrop = document.getElementById('mobile-backdrop');
const mobileMenuButton = document.getElementById('mobile-menu-button');

// ==================== UTILITY FUNCTIONS ====================

/**
 * Detects if the viewport is mobile size
 */
function checkIfMobile() {
    return window.matchMedia('(max-width: 767px)').matches;
}

/**
 * Fetches settings.json from the server
 */
async function fetchSettings() {
    const response = await fetch('/settings.json');
    if (!response.ok) throw new Error('Failed to fetch settings.json');
    return await response.json();
}

/**
 * Processes URL parameters to override settings
 */
function processURLOverrides(settings) {
    const hash = window.location.hash;
    const queryString = hash.includes('?') ? hash.split('?')[1].split('#')[0] : '';
    const params = new URLSearchParams(queryString);

    // Deep copy settings
    const newSettings = JSON.parse(JSON.stringify(settings));

    // Override theme colors
    if (newSettings.theme) {
        for (const key in newSettings.theme) {
            if (params.has(key)) {
                newSettings.theme[key] = decodeURIComponent(params.get(key));
            }
        }
    }

    // Override logo URL
    if (newSettings.sidebar && params.has('logoUrl')) {
        newSettings.sidebar.logoUrl = decodeURIComponent(params.get('logoUrl'));
    }

    return newSettings;
}

/**
 * Applies theme colors to CSS custom properties
 */
function applyTheme(theme) {
    if (!theme) return;
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme)) {
        root.style.setProperty(`--color-${key}`, value);
    }
}

/**
 * Initializes sidebar state from localStorage
 */
function initializeSidebarState() {
    const savedState = localStorage.getItem("sidebarState");
    isSidebarExpanded = savedState 
        ? savedState === 'expanded' 
        : appSettings.sidebar.defaultState === 'expanded';

    const savedSubmenus = localStorage.getItem("openSubmenus");
    openSubmenus = savedSubmenus ? new Set(JSON.parse(savedSubmenus)) : new Set();
}

/**
 * Finds the first linkable item for default navigation
 */
function findDefaultHref(navItems) {
    for (const item of navItems) {
        if (item.type === 'link') {
            return item.href;
        }
        if (item.type === 'submenu' && item.children.length > 0) {
            return item.children[0].href;
        }
    }
    return '#/';
}

/**
 * Finds the best matching nav item for a given href
 */
function findNavItemByHref(navItems, href) {
    let bestMatch = undefined;

    const checkItem = (item) => {
        if (href.startsWith(item.href)) {
            const nextChar = href[item.href.length];
            if (nextChar === undefined || nextChar === '#' || nextChar === '?') {
                if (!bestMatch || item.href.length > bestMatch.navLink.href.length) {
                    const remainingPart = href.substring(item.href.length);
                    bestMatch = { navLink: item, remainingPart };
                }
            }
        }
    };

    for (const item of navItems) {
        if (item.type === 'link') {
            checkItem(item);
        }
        if (item.type === 'submenu') {
            for (const child of item.children) {
                checkItem(child);
            }
        }
    }
    return bestMatch;
}

// ==================== RENDERING FUNCTIONS ====================

/**
 * Renders a navigation link
 */
function createLinkHtml(item, isInSubmenu = false) {
    const currentHash = window.location.hash || '#/';
    const isActive = currentHash === item.href || currentHash.startsWith(item.href + '?') || currentHash.startsWith(item.href + '#');
    const activeClasses = isInSubmenu ? 'text-primary' : 'bg-primary/10 text-primary';
    const defaultClasses = isInSubmenu 
        ? 'hover:bg-muted text-secondary-foreground/70 hover:text-secondary-foreground'
        : 'hover:bg-muted text-secondary-foreground/80 hover:text-secondary-foreground';
    
    const sizeClasses = isInSubmenu ? 'text-sm p-2 my-0.5' : 'p-2 my-2.5';
    const iconSize = isInSubmenu ? 16 : 20;
    
    return `
        <a href="${item.href}" 
           data-testid="link-${item.label.toLowerCase().replace(/\s+/g, '-')}"
           class="nav-link relative flex items-center ${sizeClasses} font-medium rounded-md cursor-pointer transition-colors group ${isActive ? activeClasses : defaultClasses}">
            ${isInSubmenu ? `<div class="absolute left-0 h-full w-0.5 ${isActive ? 'bg-primary' : ''}"></div>` : ''}
            <i data-lucide="${item.icon}" class="w-${iconSize/4} h-${iconSize/4} flex-shrink-0 ${isInSubmenu ? 'mr-3' : ''}"></i>
            <span class="link-label whitespace-nowrap ${isInSubmenu ? '' : 'ml-3'} transition-opacity duration-200 ease-out">${item.label}</span>
            
            ${!isInSubmenu ? `<div class="tooltip absolute left-full rounded-md px-2 py-1 ml-2 bg-primary text-primary-foreground text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10 whitespace-nowrap">
                ${item.label}
                <div class="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-primary rotate-45"></div>
            </div>` : ''}
        </a>`;
}

/**
 * Renders a submenu
 */
function createSubmenuHtml(item) {
    const currentHash = window.location.hash || '#/';
    const isChildActive = item.children.some(child => 
        currentHash === child.href || currentHash.startsWith(child.href + '?') || currentHash.startsWith(child.href + '#')
    );
    const isOpen = openSubmenus.has(item.path);
    
    let childrenHtml = '';
    item.children.forEach(child => {
        childrenHtml += createLinkHtml(child, true);
    });
    
    return `
        <div class="submenu-container">
            <div data-submenu-path="${item.path}" 
                 data-testid="submenu-${item.path}"
                 class="submenu-toggle relative flex items-center p-2 my-2.5 font-medium rounded-md cursor-pointer transition-colors group ${isChildActive ? 'text-primary' : 'hover:bg-muted text-secondary-foreground/80 hover:text-secondary-foreground'}">
                <i data-lucide="${item.icon}" class="w-5 h-5 flex-shrink-0"></i>
                <span class="submenu-label flex-1 whitespace-nowrap ml-3 transition-opacity duration-200 ease-out">${item.label}</span>
                <i data-lucide="chevron-down" class="chevron-icon w-4 h-4 ml-auto ${isOpen ? 'rotated' : ''}" style="display: none;"></i>
                
                <div class="tooltip absolute left-full rounded-md px-2 py-1 ml-2 bg-primary text-primary-foreground text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10 whitespace-nowrap">
                    ${item.label}
                    <div class="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-primary rotate-45"></div>
                </div>
            </div>
            <div class="submenu-children pl-5 ${isOpen ? '' : 'collapsed'}" style="height: auto;">
                ${childrenHtml}
            </div>
        </div>`;
}

/**
 * Renders a header
 */
function createHeaderHtml(item) {
    return `
        <h3 class="header-label text-xs font-semibold uppercase text-muted-foreground pl-3 mt-4 mb-2 transition-all duration-300 ease-out">
            ${item.label}
        </h3>`;
}

/**
 * Renders the complete sidebar
 */
function renderSidebar() {
    const { navItems, profile, logoUrl } = appSettings.sidebar;
    
    let navHtml = '';
    navItems.forEach(item => {
        if (item.type === 'header') {
            navHtml += createHeaderHtml(item);
        } else if (item.type === 'link') {
            navHtml += createLinkHtml(item);
        } else if (item.type === 'submenu') {
            navHtml += createSubmenuHtml(item);
        }
    });

    const isEffectivelyExpanded = isMobile ? true : (isSidebarExpanded || isHovering);
    const widthClass = isEffectivelyExpanded ? 'w-64' : 'w-16';
    const mobileClasses = isMobile 
        ? `fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`
        : 'hidden md:flex';

    sidebarContainer.innerHTML = `
        <aside class="${mobileClasses} ${isMobile ? 'w-64' : widthClass} h-full flex-col bg-white border-r border-border shadow-sm transition-[width] duration-300 ease-out overflow-x-hidden"
               data-testid="sidebar">
            <div class="logo-container p-4 pb-2 flex items-center ${isEffectivelyExpanded ? 'justify-between' : 'justify-center'}">
                <div class="logo-wrapper overflow-hidden transition-[max-width] duration-300 ease-out ${isEffectivelyExpanded ? 'max-w-32' : 'max-w-0'}">
                    <img src="${logoUrl}" class="h-10 w-auto" alt="Logo" data-testid="logo" />
                </div>
                <button id="sidebar-toggle" 
                        data-testid="button-sidebar-toggle"
                        class="p-1.5 rounded-lg bg-secondary hover:bg-muted" 
                        aria-label="${isEffectivelyExpanded ? 'Collapse sidebar' : 'Expand sidebar'}">
                    <i data-lucide="${isEffectivelyExpanded ? 'chevron-left' : 'chevron-right'}" class="w-5 h-5 text-secondary-foreground"></i>
                </button>
            </div>
            
            <nav class="flex-1 px-3 overflow-y-auto overflow-x-hidden">
                ${navHtml}
            </nav>
            
            <div id="profile-section" 
                 data-testid="profile-link"
                 data-href="${profile.href}"
                 data-iframe-url="${profile.iframeUrl || ''}"
                 class="border-t border-border flex p-3 cursor-pointer hover:bg-muted">
                <div class="w-10 h-10 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
                    <i data-lucide="${profile.icon}" class="w-6 h-6 text-primary-foreground"></i>
                </div>
                <div class="profile-info flex-1 ml-3 min-w-0 transition-opacity duration-200 ease-out ${isEffectivelyExpanded ? 'opacity-100' : 'opacity-0'}">
                    <div class="leading-4 whitespace-nowrap">
                        <h4 class="font-semibold text-sm text-primary whitespace-nowrap">${profile.name}</h4>
                        <span class="text-xs text-muted-foreground whitespace-nowrap">${profile.role}</span>
                    </div>
                </div>
            </div>
        </aside>
    `;

    // Update visibility of labels and icons based on expanded state
    updateSidebarVisibility();
    
    // Reinitialize Lucide icons
    lucide.createIcons();
    
    // Reattach event listeners
    attachSidebarEventListeners();
}

/**
 * Updates the visibility of sidebar elements based on expanded state
 */
function updateSidebarVisibility() {
    const isEffectivelyExpanded = isMobile ? true : (isSidebarExpanded || isHovering);
    
    // Update labels
    const labels = sidebarContainer.querySelectorAll('.link-label, .submenu-label, .profile-info, .header-label, .logo-wrapper');
    labels.forEach(label => {
        if (isEffectivelyExpanded) {
            label.style.opacity = '1';
            if (label.classList.contains('logo-wrapper')) {
                label.classList.remove('max-w-0');
                label.classList.add('max-w-32');
            }
        } else {
            label.style.opacity = '0';
            if (label.classList.contains('logo-wrapper')) {
                label.classList.remove('max-w-32');
                label.classList.add('max-w-0');
            }
        }
    });
    
    // Update chevron icons visibility
    const chevrons = sidebarContainer.querySelectorAll('.chevron-icon');
    chevrons.forEach(chevron => {
        chevron.style.display = isEffectivelyExpanded ? 'block' : 'none';
    });
    
    // Update tooltips visibility
    const tooltips = sidebarContainer.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.style.display = isEffectivelyExpanded ? 'none' : 'block';
    });
    
    // Update sidebar width
    const aside = sidebarContainer.querySelector('aside');
    if (aside && !isMobile) {
        aside.classList.remove('w-64', 'w-16');
        aside.classList.add(isEffectivelyExpanded ? 'w-64' : 'w-16');
    }
}

/**
 * Renders the main content (iframe or welcome message)
 */
function renderMainContent() {
    const currentHash = window.location.hash || '#/';
    const navItems = appSettings.sidebar.navItems;
    const defaultHref = findDefaultHref(navItems);
    const targetHash = currentHash === '#/' ? defaultHref : currentHash;
    const match = findNavItemByHref(navItems, targetHash);
    
    if (!match || !match.navLink.iframeUrl) {
        mainContent.innerHTML = `
            <div class="p-8" data-testid="welcome-screen">
                <h1 class="text-3xl font-bold text-primary">Welcome to your Dashboard</h1>
                <p class="mt-4 text-muted-foreground">Select a menu item to view its content.</p>
                <p class="mt-2 text-sm text-muted-foreground">Current route: <code>${currentHash}</code></p>
            </div>
        `;
        return;
    }

    const iframeUrl = match.navLink.iframeUrl;
    const remainingPart = match.remainingPart;
    
    // Security check
    const allowedDomains = appSettings.security?.allowedIframeDomains || [];
    let finalUrl;
    
    try {
        finalUrl = new URL(iframeUrl, window.location.origin);
    } catch (error) {
        showSecurityError('The configured iframe URL is invalid.');
        return;
    }
    
    const isRelative = iframeUrl.startsWith('/') || iframeUrl.startsWith('./');
    if (!isRelative) {
        const hostname = finalUrl.hostname;
        const isAllowed = allowedDomains.some(domain => 
            hostname === domain || hostname.endsWith(`.${domain}`)
        );
        
        if (!isAllowed) {
            showSecurityError('For security reasons, only content from configured domains can be displayed.');
            return;
        }
    }
    
    // Add parameters and hash from URL
    const [queryPart, hashPart] = remainingPart.split('#');
    const paramsFromHash = new URLSearchParams(queryPart.startsWith('?') ? queryPart.substring(1) : '');
    const iframeHash = hashPart ? `#${hashPart}` : '';
    
    paramsFromHash.forEach((value, key) => {
        finalUrl.searchParams.append(key, value);
    });
    
    if (iframeHash) {
        finalUrl.hash = iframeHash;
    }
    
    const finalUrlString = finalUrl.toString();
    
    mainContent.innerHTML = `
        <div class="w-full h-full relative">
            <div id="iframe-loader" class="absolute inset-0 flex items-center justify-center bg-secondary/50 backdrop-blur-sm z-10">
                <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <iframe
                id="content-iframe"
                data-testid="content-iframe"
                src="${finalUrlString}"
                class="w-full h-full border-none opacity-0 transition-opacity duration-300"
                title="${match.navLink.label || 'Content'}"
                allowfullscreen
            ></iframe>
        </div>
    `;
    
    const iframe = document.getElementById('content-iframe');
    const loader = document.getElementById('iframe-loader');
    
    iframe.addEventListener('load', () => {
        loader.style.display = 'none';
        iframe.classList.remove('opacity-0');
        iframe.classList.add('opacity-100');
    });
}

/**
 * Shows a security error message
 */
function showSecurityError(message) {
    mainContent.innerHTML = `
        <div class="p-8 text-center" data-testid="error-screen">
            <h1 class="text-2xl font-bold text-red-600">Content Blocked</h1>
            <p class="mt-4 text-muted-foreground">${message}</p>
        </div>
    `;
}

// ==================== EVENT HANDLERS ====================

/**
 * Attaches all sidebar event listeners
 */
function attachSidebarEventListeners() {
    // Sidebar toggle button
    const toggleButton = document.getElementById('sidebar-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            if (isMobile) {
                isMobileMenuOpen = false;
                updateMobileMenu();
            } else {
                isSidebarExpanded = !isSidebarExpanded;
                localStorage.setItem('sidebarState', isSidebarExpanded ? 'expanded' : 'collapsed');
                updateSidebarVisibility();
            }
        });
    }
    
    // Submenu toggles
    const submenuToggles = sidebarContainer.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const path = toggle.dataset.submenuPath;
            toggleSubmenu(path);
        });
    });
    
    // Navigation links
    const navLinks = sidebarContainer.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile) {
                isMobileMenuOpen = false;
                updateMobileMenu();
            }
        });
    });
    
    // Profile link
    const profileSection = document.getElementById('profile-section');
    if (profileSection) {
        profileSection.addEventListener('click', () => {
            const href = profileSection.dataset.href;
            window.location.hash = href;
            if (isMobile) {
                isMobileMenuOpen = false;
                updateMobileMenu();
            }
        });
    }
    
    // Hover events for desktop
    if (!isMobile) {
        const aside = sidebarContainer.querySelector('aside');
        if (aside) {
            aside.addEventListener('mouseenter', () => {
                if (!isSidebarExpanded) {
                    isHovering = true;
                    updateSidebarVisibility();
                }
            });
            
            aside.addEventListener('mouseleave', () => {
                if (!isSidebarExpanded) {
                    isHovering = false;
                    updateSidebarVisibility();
                }
            });
        }
    }
}

/**
 * Toggles a submenu open/closed
 */
function toggleSubmenu(path) {
    if (openSubmenus.has(path)) {
        openSubmenus.delete(path);
    } else {
        openSubmenus.add(path);
    }
    localStorage.setItem('openSubmenus', JSON.stringify(Array.from(openSubmenus)));
    
    // Update the specific submenu
    const submenuToggle = sidebarContainer.querySelector(`[data-submenu-path="${path}"]`);
    if (submenuToggle) {
        const chevron = submenuToggle.querySelector('.chevron-icon');
        const submenuChildren = submenuToggle.parentElement.querySelector('.submenu-children');
        
        if (openSubmenus.has(path)) {
            chevron.classList.add('rotated');
            submenuChildren.classList.remove('collapsed');
            // Set explicit height for animation
            submenuChildren.style.height = submenuChildren.scrollHeight + 'px';
        } else {
            chevron.classList.remove('rotated');
            submenuChildren.style.height = submenuChildren.scrollHeight + 'px';
            // Force reflow
            submenuChildren.offsetHeight;
            submenuChildren.classList.add('collapsed');
        }
    }
}

/**
 * Updates mobile menu state
 */
function updateMobileMenu() {
    if (isMobileMenuOpen) {
        mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        mobileBackdrop.classList.add('opacity-100', 'pointer-events-auto');
    } else {
        mobileBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
        mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
    }
    renderSidebar();
}

/**
 * Handles hash change events
 */
function handleHashChange() {
    renderMainContent();
    renderSidebar(); // Re-render to update active states
}

/**
 * Handles window resize
 */
function handleResize() {
    const wasMobile = isMobile;
    isMobile = checkIfMobile();
    
    if (wasMobile !== isMobile) {
        if (isMobile) {
            isMobileMenuOpen = false;
        }
        renderSidebar();
    }
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Check if mobile
        isMobile = checkIfMobile();
        
        // Fetch and process settings
        const settings = await fetchSettings();
        appSettings = processURLOverrides(settings);

        // Apply theme
        applyTheme(appSettings.theme);
        
        // Initialize sidebar state
        if (!isMobile) {
            initializeSidebarState();
        }

        // Initial render
        renderSidebar();
        renderMainContent();
        
        // Set up event listeners
        mobileMenuButton.addEventListener('click', () => {
            isMobileMenuOpen = !isMobileMenuOpen;
            updateMobileMenu();
        });
        
        mobileBackdrop.addEventListener('click', () => {
            isMobileMenuOpen = false;
            updateMobileMenu();
        });
        
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('resize', handleResize);
        
        // Initialize Lucide icons
        lucide.createIcons();

    } catch (error) {
        console.error("Failed to initialize application:", error);
        mainContent.innerHTML = `<p class="p-8 text-red-500">Error: Failed to load settings.</p>`;
    }
});
