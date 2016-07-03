const Menu = (function(window) {
    "use strict";
    // PRIVATE
    //CONFIG
    const header       = document.getElementById('js-header');
    const menu         = document.getElementById('js-menu');
    const headerHeight = getComputedStyle(header).height.split('px')[0];
    const menuHeight   = getComputedStyle(menu).height.split('px')[0];
    const menuOpen     = document.getElementById('js-menu-open');
    const menuClose    = document.getElementById('js-menu-close');
    const nav          = document.getElementById('js-nav');

    // console.log(menuHeight);
    // console.log(headerHeight);

    const scroll = () => {
      //config
      let wScroll      = window.pageYOffset;
      let hasClass1    = menu.classList.contains('is-fixed');
      let hasClass2    = menu.classList.contains('have-shadow');
      let fix          = !hasClass1 && (wScroll >= headerHeight - menuHeight);
      let unfix        = hasClass1 && (wScroll <= headerHeight - menuHeight);
      let addShadow    = !hasClass2 && wScroll >= headerHeight;
      let removeShadow = hasClass2 && wScroll <= headerHeight;
      // console.log(hasClass1);

      /*if (fix) {
        menu.classList.add('is-fixed');
      }
      if (unfix) {
        menu.classList.remove('is-fixed');
      }
      if (addShadow) {
        menu.classList.add('have-shadow')
      }
      if (removeShadow) {
        menu.classList.remove('have-shadow')
      }*/

    switch (true) {
        case fix:
          menu.classList.add('is-fixed');
          break;
        case unfix:
          menu.classList.remove('is-fixed');
          break;
        case addShadow:
          menu.classList.add('have-shadow');
          break;
        case removeShadow:
          menu.classList.remove('have-shadow');
          break;
      }
    };

  const openHandler = () => {
    // console.log(event);
    nav.classList.add('nav-is-showing');
    menuOpen.classList.toggle('is-hidden')
    menuClose.classList.toggle('is-hidden')
  };

  const closeHandler = () => {
    // console.log('click');
    nav.classList.remove('nav-is-showing')
    menuOpen.classList.toggle('is-hidden')
    menuClose.classList.toggle('is-hidden')
  };

// console.log(window.innerHeight);
 // PUBLIC
 const windowListener    = window.addEventListener('scroll', scroll, false);
 const openMenuListener  = menuOpen.addEventListener('click', openHandler, false);
 const closeMenuListener = menuClose.addEventListener('click', closeHandler, false);

 return {
   listeners: [
              windowListener,
              openMenuListener,
              closeMenuListener
            ]
 }

})(window);

// Menu.listeners
