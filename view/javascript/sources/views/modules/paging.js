const paging = {
	view: "toolbar",
	id: "paging",
	css: "highlighted_header header6",
	paddingX: 5, paddingY: 5, height: 40,
	cols: [{
		view: "pager", id: "pagerA",
		template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
		autosize:true, 
		//size: 50,
		height: 35,
		group: 5
	}]
};

export default paging;

//https://snippet.webix.com/4teaka0o