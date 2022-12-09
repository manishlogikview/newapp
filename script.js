            var currentTab = 0;

            
            console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');
            window.addEventListener('beforeunload', function (e) {
                
                e.preventDefault();
                e.returnValue = '';
            });
            // setTimeout(()=>{
            //     $.toast({text:'Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line',
            //     loaderBg: '#9EC600',
            //     icon: 'success'
            // });
            // },500)
          
window.addEventListener('online', () => {console.log('Became online')
$.toast({text:'Back Online',
loaderBg: '#9EC600',
icon: 'success'
});

if(localStorage.getItem("tab") == '5'){
    nextPrev(1);
}
});
window.addEventListener('offline', () => {
    alert("You are currently offline. Please do not close browser to avoid data loss");
    $.toast({text:'You are currently offline. Please do not close browser to avoid data loss' ,
loaderBg: '#9EC600',
icon: 'error'
});
    console.log('Became offline')});

              document.addEventListener("DOMContentLoaded", function(event) {


              showTab(currentTab);

              });

              function showTab(n) {
                console.log(n);
              var x = document.getElementsByClassName("tab");
              x[n].style.display = "block";
              if (n == 0) {
              document.getElementById("prevBtn").style.display = "none";
              } else {
              document.getElementById("prevBtn").style.display = "inline";
              }
              if (n == (x.length - 1)) {
              document.getElementById("nextBtn").innerHTML = '<i class="fa fa-angle-double-right"></i>';
              } else {
              document.getElementById("nextBtn").innerHTML = '<i class="fa fa-angle-double-right"></i>';
              }
              fixStepIndicator(n)
              }

              function nextPrev(n) {
                window.onbeforeunload = null;
              var x = document.getElementsByClassName("tab");

              if(!window.navigator.onLine && currentTab >= x.length -1){
                alert("You are currently offline. Please do not close browser to avoid data loss");
                alert("Data will be auto submitted once you are back online");
                $.toast({text:'You are currently offline. Please do not close browser to avoid data loss',
                loaderBg: '#9EC600',
                icon: 'error'
                });
                return true;
             }
             
              if (n == 1 && !validateForm()) return false;
              x[currentTab].style.display = "none";
              currentTab = currentTab + n;
              if(currentTab == 6){
                console.log("hello");
                window.onbeforeunload = ()=>{
                    return true;
                }
                // window.removeEventListener("beforeunload",()=>{})
              }
              console.log(x.length, currentTab);
              if (currentTab >= x.length) {
              
                
              document.getElementById("nextprevious").style.display = "none";
              document.getElementById("all-steps").style.display = "none";
              document.getElementById("register").style.display = "none";
              document.getElementById("text-message").style.display = "block";




              }
              storeInLocal();
              showTab(currentTab);
              localStorage.setItem("tab",JSON.stringify(currentTab));
              }

              function storeInLocal(){
               
                var a = JSON.stringify($("#regForm").serializeArray())
                var encryptedAES = CryptoJS.AES.encrypt(a, "My Secret Passphrase");
                localStorage.setItem("formData",encryptedAES.toString());
            
           

                    console.log(encryptedAES.toString());
               
                
              }

              function validateForm() {
                   var x, y, i, valid = true;
                   x = document.getElementsByClassName("tab");
                   y = x[currentTab].getElementsByTagName("input");
                   for (i = 0; i < y.length; i++) {
                       if (y[i].value == "") {
                           y[i].className += " invalid";
                           valid = false;
                       }


                   }
                   if (valid) {
                       document.getElementsByClassName("step")[currentTab].className += " finish";
                   }
                   return valid;
               }

               function fixStepIndicator(n) {
                   var i, x = document.getElementsByClassName("step");
                   for (i = 0; i < x.length; i++) {
                       x[i].className = x[i].className.replace(" active", "");
                   }
                   x[n].className += " active";
               }