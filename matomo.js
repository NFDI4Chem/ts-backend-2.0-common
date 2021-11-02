// Trigger pageview tracking on mounting of React component
componentDidMount();{
    this.registerPageLoad();
    // Other component mounting logic if needed
    }
    
    // Push pageview event to Matomo on component mount
    registerPageLoad();{
        var _paq = window._paq || [];
        _paq.push(['setCustomUrl', '//support.tib.eu/piwik/'+'piwik.php']);
        _paq.push(['setDocumentTitle', 'My Document Title']);
        _paq.push(['trackPageView']);
    }

    export default registerPageLoad;