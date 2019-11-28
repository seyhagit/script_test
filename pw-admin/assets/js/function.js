function clickTabMenu(mainBoxMenu,contentTap='',parents) {
	var bgColor;
	$(parents).find(mainBoxMenu).each(function () {
		var indexTab = 0;
		var findLi = $(this).find('>li');
		findLi.each(function () {
			$(this).attr('data-clicktap','click-tap-'+indexTab);
			$(this).append('<span class="layer-menu-tap"></span>');
			indexTab++;
		});
	});
	if (contentTap != '') {
		$(parents).each(function () {
			var indexContentTap = 0;
			$(this).find(contentTap).each(function () {
				$(this).attr('data-contenttap','click-tap-'+indexContentTap);
				if (indexContentTap == 0) {
					$(this).addClass('content-tab-active');
				}
				bgColor = $(this).css('background-color');
				indexContentTap++;
			});
		});
	}
	$(parents).on('click','[data-clicktap]',function () {
		var dataClickTap = $(this).data('clicktap');
		$(this).parents(mainBoxMenu).find('[data-clicktap] .layer-menu-tap').hide();
		$(this).find('.layer-menu-tap').show();
		$(this).parents(mainBoxMenu).find('[data-clicktap]').css({'background-color':'#F5F5F5'});
		$(this).css({'background-color':bgColor});
		$(this).after().show();
		$(this).parents(parents).find('[data-contenttap]').hide();
		$(this).parents(parents).find('[data-contenttap="'+dataClickTap+'"]').show();
	});
}