/*********************
//* jQuery Multi Level CSS Menu #2- By Dynamic Drive: http://www.dynamicdrive.com/
//* Last update: Nov 7th, 08': Limit # of queued animations to minmize animation stuttering
//* Menu avaiable at DD CSS Library: http://www.dynamicdrive.com/style/
*********************/
//Update: April 12th, 10: Fixed compat issue with jquery 1.4x

jqueryfademenu = {

    animateduration: {over: 200, out: 200}, //duration of fade in/ out animation, in milliseconds
    
    buildmenu:function(menuid){
        var $mainmenu=$('#' + menuid + '>ul'),
            $headers=$mainmenu.find("ul").parent();
        
        if( $('html').hasClass('rtl') ) {
            $mainmenu.parent().addClass('dir_rtl');
        };
        
        $headers.each(function(i){
            var $curobj=$(this),
                $subul=$(this).find('ul:eq(0)');
            this._dimensions={w:this.offsetWidth, h:this.offsetHeight, subulw:$subul.outerWidth(), subulh:$subul.outerHeight()}
            this.istopheader=$curobj.parents("ul").length==1? true : false
            $subul.css({top:this.istopheader? this._dimensions.h+"px" : 0})
            $curobj.children("a:eq(0)").addClass(this.istopheader ? 'arrow_down' : 'arrow_right');
            $curobj.hover(
                function(e){
                    $(this).addClass('active');
                    var $targetul=$(this).children("ul:eq(0)");
                    if( $('html').hasClass('rtl') ) {
                        this._offsets={right:$(this).offset().right, top:$(this).offset().top};
                        var menuright=this.istopheader? 0 : this._dimensions.w;
                        menuright = (this._offsets.right+menuright+this._dimensions.subulw>$(window).width())? (this.istopheader? -this._dimensions.subulw+this._dimensions.w : -this._dimensions.w) : menuright;
                        if ($targetul.queue().length<=1) {
                            $targetul.css({right:menuright+"px", width:this._dimensions.subulw+'px'}).fadeIn(jqueryfademenu.animateduration.over)
                        }
                    } else {
                        this._offsets={left:$(this).offset().left, top:$(this).offset().top};
                        var menuleft=this.istopheader? 0 : this._dimensions.w;
                        menuleft = (this._offsets.left+menuleft+this._dimensions.subulw>$(window).width())? (this.istopheader? -this._dimensions.subulw+this._dimensions.w : -this._dimensions.w) : menuleft;
                        if ($targetul.queue().length<=1) {
                            $targetul.css({left:menuleft+"px", width:this._dimensions.subulw+'px'}).fadeIn(jqueryfademenu.animateduration.over)
                        }
                    }
                },
                function(e){
                    $(this).removeClass('active');
                    var $targetul=$(this).children("ul:eq(0)");
                    $targetul.fadeOut(jqueryfademenu.animateduration.out,function(){
						$targetul.find('ul').css('display','none');
					})
                }
            )
            $curobj.click(function(){
                $(this).children("ul:eq(0)").hide();
            })
        });
        
        $mainmenu.find("ul").css({display:'none', visibility:'visible'})
    }
}
