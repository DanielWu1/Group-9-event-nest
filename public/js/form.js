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
                let myeach = '<p class="container3"> not found by ' +mysearch+'</p><br>'
                serchevent.append(myeach)
            }
            else{
                for(let i =0 ; i <newelement.length; i++){
            	    let showdetail = newelement[i]
                    // console.log(showdetail)
<<<<<<< HEAD
                    let openingTag = `<div class="ggg">`
=======
                
>>>>>>> c4433d777282876c7bb87dae9522e76fc1cddc6a
            	    let myeach1 = '<p class="container3">' +showdetail.title+'</p><br>'
                    let myeach2 = '<p class="container3"> <strong >Category:</strong>    ' +showdetail.category+' </p><br>'
                    let myeach3 = '<p class="container3"><strong >Creator Name: </strong>   ' +showdetail.creator+'</p><br>'
                    let myeach4 = '<p class="container3"><strong >Start Time:</strong>   ' +showdetail.timestart+'</p><br>'
                    let myeach5 = '<p class="container3"><strong> End Time:</strong>   ' +showdetail.endtime+'</p><br>'
                    let myeach6 = '<p class="container3"><strong >Address:</strong>   ' +showdetail.address+'</p><br>'
                    let myeach7 = '<p class="container3"><strong >City:</strong>    ' +showdetail.city+'</p><br>'
                    let myeach8 = '<p class="container3"><strong >State:</strong>    ' +showdetail.state+'</p><br>'
                    let myeach9 = '<p class="container3"><strong >Description:</strong>    ' +showdetail.description+'</p> <br>'
                    let myeach10 = '<p class="container4"><strong >Ticket Price: </strong>   ' +showdetail.price+'</p><br>' 
                    let myeach11 = '<p class="container4"><strong >Ticket Left: </strong>   ' +showdetail.ticketcapacity+'</p><br>'  
<<<<<<< HEAD
                    let myeach12 = `<a href="/checkout/${showdetail._id}">Buy Ticket</a>`
                    let closingTag = `</div><br>`
                    let totalhtml = openingTag + myeach1 + myeach2 + myeach3 + myeach4 + myeach5 + myeach6 + myeach7 + myeach8 + myeach9 + myeach10 + myeach11 + myeach12 + closingTag
            	    serchevent.append(totalhtml)
=======
                    //let myeach12 = '<button class="container5" type="submit"> <a href="/checkout/''" style="text-decoration: none ; color:#eee">Buy Ticket</a></button>'
                    
            	    serchevent.append(myeach1,myeach2,myeach3,myeach4,myeach5,myeach6,myeach7,myeach8,myeach9,myeach10,myeach11)
>>>>>>> c4433d777282876c7bb87dae9522e76fc1cddc6a
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
                        let openingTag = `<div class="ggg">`
                        let myeach1 = '<p class="container3">' +showdetail.title+'</p><br>'
                        let myeach2 = '<p class="container3"> <strong >Category:</strong>    ' +showdetail.category+' </p><br>'
                        let myeach3 = '<p class="container3"><strong >Creator Name: </strong>   ' +showdetail.creator+'</p><br>'
                        let myeach4 = '<p class="container3"><strong >Start Time:</strong>   ' +showdetail.timestart+'</p><br>'
                        let myeach5 = '<p class="container3"><strong> End Time:</strong>   ' +showdetail.endtime+'</p><br>'
                        let myeach6 = '<p class="container3"><strong >Address:</strong>   ' +showdetail.address+'</p><br>'
                        let myeach7 = '<p class="container3"><strong >City:</strong>    ' +showdetail.city+'</p><br>'
                        let myeach8 = '<p class="container3"><strong >State:</strong>    ' +showdetail.state+'</p><br>'
                        let myeach9 = '<p class="container3"><strong >Description:</strong>    ' +showdetail.description+'</p> <br>'
                        let myeach10 = '<p class="container4"><strong >Ticket Price: </strong>   ' +showdetail.price+'</p><br>' 
                        let myeach11 = '<p class="container4"><strong >Ticket Left: </strong>   ' +showdetail.ticketcapacity+'</p><br>'  
                        let myeach12 = `<a href="/checkout/${showdetail._id}">Buy Ticket</a>`
                        let closingTag = `</div><br>`
                        let totalhtml = openingTag + myeach1 + myeach2 + myeach3 + myeach4 + myeach5 + myeach6 + myeach7 + myeach8 + myeach9 + myeach10 + myeach11 + myeach12 + closingTag
                        serchevent.append(totalhtml)
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

