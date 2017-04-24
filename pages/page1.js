const extend = require("js-base/core/extend");
const Button = require('sf-core/ui/button');
const Page = require("sf-core/ui/page");

const MCS_Helper = require('mcs');
var MCS = new MCS_Helper();

var base64TestImageData = 'iVBORw0KGgoAAAANSUhEUgAAAFkAAABfCAYAAACDUmuyAAAQMElEQVR42u1dC3gTVRYOIIgib2ib';

var loginSuccess = false;

const Page1 = extend(Page)(
    function(_super) {
        var self = this;
        _super(self);

        var button1 = new Button({
            text: 'Login',
            flexGrow: 1,
            onPress: MCS_LOGIN
        });
        var button2 = new Button({
            text: 'Register Device For Push Notification',
            flexGrow: 1,
            onPress: MCS_REGISTER
        });
        var button3 = new Button({
            text: 'Deregister Device For Push Notification',
            flexGrow: 1,
            onPress: MCS_DEREGISTER
        });
        var button4 = new Button({
            text: 'Send Analytic - Basic Event',
            flexGrow: 1,
            onPress: MCS_SEND_BASIC_ANALYTIC
        });
        var button5 = new Button({
            text: 'Send Analytic',
            flexGrow: 1,
            onPress: MCS_SEND_ANALYTIC
        });
        var button6 = new Button({
            text: 'Api Caller (GET)',
            flexGrow: 1,
            onPress: MCS_APICALLER_GET
        });

        var button7 = new Button({
            text: 'Storage Get Item Test',
            flexGrow: 1,
            onPress: MCS_STORAGE_GETTER_TEST
        });

        var button8 = new Button({
            text: 'Store Item',
            flexGrow: 1,
            onPress: MCS_STORE_ITEM
        });



        // MCS INIT
        var options = {
            'backendId': '3b07f69f-7650-4c11-89e1-8dc9424c43d9',
            'baseUrl': 'https://smartface-mobilebel.mobileenv.em2.oraclecloud.com:443',
            'androidApplicationKey': '5cbcf2f5-27da-4b8d-9651-d4e6982a3f7e',
            'iOSApplicationKey': '90729131-ad3f-49c2-adae-6e1c5b7b9411'

        };
        MCS.init(options);


        this.layout.addChild(button1);
        this.layout.addChild(button2);
        this.layout.addChild(button3);
        this.layout.addChild(button4);
        this.layout.addChild(button5);
        this.layout.addChild(button6);
        this.layout.addChild(button7);
        this.layout.addChild(button8);

    });

// Gets/sets press event callback for btn
function MCS_LOGIN() {

    MCS.login({
            'username': 'mete',
            'password': 'Smartface1'
        },

        function(err, result) {

            if (err) {
                return alert("LOGIN FAILED.  " + err);
            }

            alert('Success ' + result);
            loginSuccess = true;



/* // TEST ICIN
            var options = {
                'name': 'mete',
                'id': '12'
            };


            MCS.getAssetByName(options, function(err, result) {

                if (err) {
                    return alert("LOGIN FAILED.  " + err);
                }

                alert('Success ' + result);


            });

            MCS.getAssetById(options, function(err, result) {

                if (err) {
                    return alert("LOGIN FAILED.  " + err);
                }

                alert('Success ' + result);


            });

*/
        }

    );

}


function MCS_SEND_BASIC_ANALYTIC() {

    if (loginSuccess == false) {
        return alert("Login should be made first.");
    }

    var optionsAnalytic = {
        'deviceID': '112233',
        'sessionID': '112233',
        'eventName': 'sendBasicEvent'
    };

    MCS.sendBasicEvent(optionsAnalytic, function(err, result) {


        if (err) {
            return alert("sendBasicEvent FAILED.  " + err);
        }

        alert("sendBasicEvent SUCC.  " + result.toString());

    });
}

function MCS_SEND_ANALYTIC() {

    if (loginSuccess == false) {
        return alert("Login should be made first.");
    }

    var optionsAnalytic = {
        'deviceID': '112233',
        'sessionID': '112233',
        'body': [{
            "name": "testMCSEvent",
            "type": "custom",
            "timestamp": new Date().toISOString()
        }]
    };

    MCS.sendAnalytic(optionsAnalytic, function(err, result) {


        if (err) {
            return alert("sendAnalytic FAILED.  " + err);
        }

        alert("sendAnalytic SUCC.  " + result.toString());

    });
}

function MCS_REGISTER() {

    if (loginSuccess == false) {
        return alert("Login should be made first.");
    }

    var optionsRegisterDevice = {
        'packageName': 'io.smartface.mcstest',
        'version': '1.0.0',
    };


    MCS.registerDeviceToken(optionsRegisterDevice, function(err, result) {


        if (err) {
            return alert("registerDeviceToken FAILED.  " + err);
        }

        alert("registerDeviceToken SUCC.  " + result.toString());


    });
}

function MCS_DEREGISTER() {

    if (loginSuccess == false) {
        return alert("Login should be made first.");
    }

    var optionsRegisterDevice = {
        'packageName': 'io.smartface.mcstest',
        'version': '1.0.0',
    };

    MCS.deregisterDeviceToken(optionsRegisterDevice, function(err, result) {


        if (err) {
            return alert("deregisterDeviceToken FAILED.  " + err);
        }

        alert("deregisterDeviceToken SUCC.  " + result.toString());

    });
}

function MCS_APP_POLICIES() {

    if (loginSuccess == false) {
        return alert("Login should be made first.");
    }

    MCS.getAppPolicies(function(err, result) {


        if (err) {
            return alert("registerDeviceToken FAILED.  " + err);
        }

        alert("registerDeviceToken SUCC.  " + result.toString());


    });
}

function MCS_APICALLER_GET() {

    if (loginSuccess == false) {
        return alert("Login should be made first.");
    }

    var optionsGetMethod = {
        'apiName': 'weather',
        'endpointName': 'getCity',
        'parameters': [

            {
                key: 'q',
                value: 'ankara'

            }, {
                key: 'appid',
                value: 'caf032ca9a5364cb41ca768e3553d9b3'

            }
        ]
    };
    MCS.apiCallerGetMethod(optionsGetMethod, function(err, result) {

        if (err) {
            return alert("sendAnalytic FAILED.  " + err);
        }

        alert("sendAnalytic SUCC.  " + result.toString());


    });

}

function MCS_STORAGE_GETTER_TEST() {

    if (loginSuccess == false) {
        return alert("Login should be made first.");
    }


    //----------------------------------------------
    MCS.getCollectionList(

        function(err, result) { // e array dönüyor. collection name leri

            if (err) {
                return alert("getCollectionList FAILED.  " + err);
            }

            var CollectionID = result[0].id;

            //----------------------------------------------
            MCS.getItemListInCollection(CollectionID,

                function(err, result) { // e array dönüyor. collection name leri

                    if (err) {
                        return alert("getItemListInCollection FAILED.  " + err);
                    }



                    var ItemId = result[0].id;

                    //----------------------------------------------
                    MCS.getItem({
                            'collectionId': CollectionID,
                            'itemId': ItemId
                        },
                        function(err, result) { // e array dönüyor. collection name leri

                            if (err) {
                                return alert("getItem FAILED.  " + err);
                            }

                            alert(result);

                        }
                    );


                }

            );


        }
    );

}



function MCS_STORE_ITEM() {

    if (loginSuccess == false) {
        return alert("Login should be made first.");
    }

    //----------------------------------------------
    MCS.getCollectionList(

        function(err, result) { // e array dönüyor. collection name leri

            if (err) {
                return alert("getCollectionList FAILED.  " + err);
            }

            var CollectionID = result[0].id;

            //----------------------------------------------
            MCS.storeItem({
                    'collectionId': CollectionID,
                    'itemName': 'TestMcs.png',
                    'base64EncodeData': base64TestImageData,
                    'contentType': 'image/png'
                },
                function(err, result) { // e array dönüyor. collection name leri

                    if (err) {
                        return alert("storeItem FAILED.  " + err);
                    }

                    alert(result + " : TestMcs.png");

                }
            );


        }
    );

}




module && (module.exports = Page1);
