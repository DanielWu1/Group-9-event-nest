(function($) {
	// Let's start writing AJAX calls!

	var searchform = $("#searchForm"), 
        serchevent = $("#serchevent"),
		searchterm = $("#search_term"),
		//homelink = $("#homeLink"),
		myallevent = $("#myallevent")
       

    searchform.submit(function (show) {
        show.preventDefault();
        // console.log(searchform)
        let mysearch = searchterm.val()

        if(mysearch == undefined || mysearch == null ||mysearch.match(/^[ ]*$/)){
            alert("You have to input something");
        } else {

        let requestConfig = {
            method: 'POST',
            url: '/search/'+mysearch
        }
        serchevent.children().each(function (index, element) {
            element.remove();
        })

        $.ajax(requestConfig).then(function (res){
            
            let newelement = res
            console.log(newelement)

            if (newelement.length === 0){
                let myeach = '<center><p class="container3"> not found by ' +mysearch+'</p></center>'
                serchevent.append(myeach)
            }
            else{
                for(let i =0 ; i <newelement.length; i++){
            	    let showdetail = newelement[i]
                    // console.log(showdetail)
                
            	    let myeach1 = '<br><p class="container3">' +showdetail.title+'</p>' 
                    let myeach2 = '<br><p class="container3">Category:    ' +showdetail.category+'</p>'
                    let myeach3 = '<br><p class="container3">Creator Name:    ' +showdetail.creator+'</p>'
                    let myeach4 = '<br><p class="container3">Date:    ' +showdetail.date+'</p>'
                    let myeach5 = '<br><p class="container3">Start Time:    ' +showdetail.timestart+'</p>'
                    let myeach6 = '<br><p class="container3">End Time:    ' +showdetail.endtime+'</p>'
                    let myeach7 = '<br><p class="container3">Address:    ' +showdetail.address+'</p>'
                    let myeach8 = '<br><p class="container3">City:    ' +showdetail.city+'</p>'
                    let myeach9 = '<br><p class="container3">State:    ' +showdetail.state+'</p>'
                    let myeach10 = '<br><<p class="container3">Description:    ' +showdetail.description+'</p>'
                    let myeach11 = '<br><p class="container4">Ticket Price:    ' +showdetail.price+'</p><br>' 

                    //let myeach12 = '<button class="container5" type="submit"> <a href="/checkout/''" style="text-decoration: none ; color:#eee">Buy Ticket</a></button>'
                    
            	    serchevent.append(myeach1,myeach2,myeach3,myeach4,myeach5,myeach6,myeach7,myeach8,myeach9,myeach10,myeach11)
                    // console.log(serchevent)
        	    }

            }

            
            myallevent.hide()
            serchevent.show()
            //homelink.show()

            // showinfo.hide()
            
        })
	}
    // // homelink.on('click', function (show){
    // //     show.preventDefault();
        
    // //     serchevent.children().each(function (index, element) {
    // //         element.remove();
    // //     })

    //     myallevent.show()
    //     serchevent.hide()
    //     //homelink.hide()
    // })
     })

     // filter button
 $('#filterbtn').on('click',function(e){

    e.preventDefault();

    let filterArr = [];
    if($('#party').is(':checked')){
        filterArr.push('Party');
    }
    if($('#getTogether').is(':checked')){
        filterArr.push('Get-Together');
    }
    if($('#conference').is(':checked')){
        filterArr.push('Conference');
    }
    if($('#workshop').is(':checked')){
        filterArr.push('workshop');
    }
    if($('#expo').is(':checked')){
        filterArr.push('Expo');
    }
    if($('#networkingSession').is(':checked')){
        filterArr.push('Networking session');
    }
    
    // console.log(filterArr)

    

    if(filterArr == undefined || filterArr == null || filterArr.length === 0){
        alert("You have to input something");
    } else {
        let requestConfig = {
            method: 'POST',
            url: '/filterevents',
            // data: JSON.stringify(
            //     {filterList : filterArr}
            // )
            data: {filterList:filterArr}
        }

        console.log(requestConfig);

        serchevent.children().each(function (index, element) {
            element.remove();
        })
    
        $.ajax(requestConfig).then(function (res){
    
    
        // alert(res)
    
            let newelement = res
                console.log(newelement)
    
                if (newelement.length === 0){
                    let myeach = '<center><p class="container3"> not found by ' +filterArr+'</p></center>'
                    serchevent.append(myeach)
                }
                else{
                    for(let i =0 ; i <newelement.length; i++){
                        let showdetail = newelement[i]
                        // console.log(showdetail)
                        // TODO: cherry for formatting?
                        let myeach1 = '<center><p class="container3">' +showdetail.title+'</p></center>'
                        let myeach2 = '<center><p class="container3">Category:    ' +showdetail.category+'</p></center>'
                        let myeach3 = '<center><p class="container3">Creator Name:    ' +showdetail.creator+'</p></center>'
                        let myeach4 = '<center><p class="container3">Date:    ' +showdetail.date+'</p></center>'
                        let myeach5 = '<center><p class="container3">Start Time:    ' +showdetail.timestart+'</p></center>'
                        let myeach6 = '<center><p class="container3">End Time:    ' +showdetail.endtime+'</p></center>'
                        let myeach7 = '<center><p class="container3">Address:    ' +showdetail.address+'</p></center>'
                        let myeach8 = '<center><p class="container3">City:    ' +showdetail.city+'</p></center>'
                        let myeach9 = '<center><p class="container3">State:    ' +showdetail.state+'</p></center>'
                        let myeach10 = '<center><p class="container3">Description:    ' +showdetail.description+'</p></center>'
                        let myeach11 = '<center><p class="container4">Ticket Price:    ' +showdetail.price+'</p></center>'
                        serchevent.append(myeach1,myeach2,myeach3,myeach4,myeach5,myeach6,myeach7,myeach8,myeach9,myeach10,myeach11)
                        // console.log(serchevent)
                    }
    
                }
    
                // serchevent.show()
    
                myallevent.hide()
                serchevent.show()
                //homelink.show()
    
            
        })


    }

   
    

})

   


})(window.jQuery);

