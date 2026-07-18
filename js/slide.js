



    $(document).ready(function(){

        var num = 0;

        $('.right_btn').click(function(){
            // >

            num++;

            if(num>2){

                num = 0;

            };

            console.log(num);

            $('.img_wrap').stop().animate({

                left: -1920 * num

            });

        });

        $('.left_btn').click(function(){
            // <

            num--;
            
            if(num<0){

                num = 2;
            };

            $('.img_wrap').stop().animate({

                left: -1920*num

            });


        });

            setInterval(function(){

            num++;

            if(num>2){

                num = 0;

            };

            console.log(num);

            $('.img_wrap').stop().animate({

                left: -1920 * num

            });
        

        },5000);



    });

