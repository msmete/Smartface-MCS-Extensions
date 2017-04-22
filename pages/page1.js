const extend = require("js-base/core/extend");
const Button = require('sf-core/ui/button');
const Page = require("sf-core/ui/page");

const MCS_Helper = require('mcs');
var MCS = new MCS_Helper();

var base64TestImageData = 'iVBORw0KGgoAAAANSUhEUgAAAFkAAABfCAYAAACDUmuyAAAQMElEQVR42u1dC3gTVRYOIIgib2ib';


const Page1 = extend(Page)(
    function(_super) {
        var self = this;
        _super(self);

        var nextButton = new Button({
            text: 'TESTT',
            flexGrow: 1,
            onPress: MCS_TEST
        });

        this.layout.addChild(nextButton);

    });

// Gets/sets press event callback for btn
function MCS_TEST() {
    
    var options = {
        'backendId' : '3b07f69f-7650-4c11-89e1-8dc9424c43d9',
        'baseUrl' : 'https://smartface-mobilebel.mobileenv.em2.oraclecloud.com:443',
        'androidApplicationKey' : '5cbcf2f5-27da-4b8d-9651-d4e6982a3f7e',
        'iOSApplicationKey' : '90729131-ad3f-49c2-adae-6e1c5b7b9411'
        
    };
    
    MCS.init(options);

    //----------------------------------------------
    MCS.login({'username':'mete','password':'Smartface1'},
    
        function(err,result) {

            if(err){
                return alert("LOGIN FAILED.  " + err);
            }
            
            //alert('Success ' + e);
            
            var optionsAnalytic = {
                'deviceID' : '3b07f69f-7650-4c11-89e1-8dc9424c43d9',
                'sessionID' : 'https://smartface-mobilebel.mobileenv.em2.oraclecloud.com:443',
                'body' : [
                            {
                                "name": "testMCSEvent",
                                "type": "custom",
                                "timestamp": new Date().toISOString()
                            }
                         ]
            };

        
            MCS.sendAnalytic(optionsAnalytic, function(err,result){
                
                
                 if(err){
                    return alert("getCollectionList FAILED.  " + err);
                 }
                    
                alert("sendAnalytic SUCC.  " + result);
                
            });

/*
            //----------------------------------------------
            MCS.getCollectionList(
                
                function(err,result) { // e array dönüyor. collection name leri
                    
                    if(err){
                        return alert("getCollectionList FAILED.  " + err);
                    }
            
                    var CollectionID = result[0].id;
                    
                    //----------------------------------------------
                    MCS.getItemListInCollection(CollectionID, 
                    
                        function(err,result) { // e array dönüyor. collection name leri
   
                            if(err){
                                return alert("getItemListInCollection FAILED.  " + err);
                            }
                    
                    
                    
                            var ItemId = result[0].id;
                            
                            //----------------------------------------------
                            MCS.getItem({'collectionId': CollectionID,'itemId':ItemId}, 
                                function(err,result) { // e array dönüyor. collection name leri
            
                                    if(err){
                                        return alert("getItem FAILED.  " + err);
                                    }
                                    
                                    alert(result);
            
                                }
                            );
                            
    
                        }
                        
                    );


                }
            );

*/
            

        }
       
    );



    //DEVICE REGISTER
    /*
    MCS.registerDeviceToken("io.smartface.mcstest",function(e) {
         alert('REGISTER SUCC ' + e);
    },
    function(e) {
        alert('REGISTER FAIL: --- ' + e);

    });
    */




}



module && (module.exports = Page1);
