var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-4905155282469394/3332065665'
      
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-4905155282469394/3332065665'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-4905155282469394/3332065665',
    };
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function initApp() {
    if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

    AdMob.createBanner( {
        adId: admobid.banner, 
        isTesting: true,
        overlap: true, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: 'black'
    } );
    
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: true
    });
}

