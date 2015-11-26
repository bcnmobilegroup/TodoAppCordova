module About {
    'use strict';

    import Paths = Constants.Paths;
    let Page = Paths.About; 

    angular.module(Page.Base, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {

        $stateProvider
            .state(Paths.Tabs + '.' + Page.Base, {
                url: '/' + Page.Base,
                views: {
                    'about-tab': {
                        templateUrl: Paths.Modules + 'about/views/about.html'
                    }
                }
            }
        );
    }
}
