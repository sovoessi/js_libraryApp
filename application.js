window.onload = fetchIssues;

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
	let issueTitle = document.getElementById('issueTitleInput').value;
	let issueCategory = document.getElementById('issueCategoryInput').value;
	let issueAuthor = document.getElementById('issueAuthorInput').value;
	let issueEditor = document.getElementById('issueEditorInput').value;
	let issueId = chance.guid();
	let issueStatus = 'Open';
	
	let issue = {
		id: issueId,
		title : issueTitle,
		category : issueCategory,
		author : issueAuthor,
		editor : issueEditor,
		status : issueStatus
	}
	
	if(localStorage.getItem('issues')){
		const issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}else{		
		const issues = []
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
		
	}
	//initialise the form
	document.getElementById('issueInputForm').reset();
	
	//call the fetchIssues to include the new implemented issues
	fetchIssues();
	
	//prevent the form from submitting
	e.preventDefault();
}

function setStatusRead(id){
	const issues = JSON.parse(localStorage.getItem('issues'));
	
	for(let i = 0; i < issues.length; i++){
		if(issues[i].id == id){
			issues[i].status = 'Read';
		}
	}
		
	localStorage.setItem('issues', JSON.stringify(issues));
	
	fetchIssues();
}

function deleteIssue(id){
	const issues = JSON.parse(localStorage.getItem('issues'));
	
	for(let i = 0; i < issues.length; i++){
		if(issues[i].id == id){
			issues.splice(i,1);
		}
	}
		
	localStorage.setItem('issues', JSON.stringify(issues));
	
	fetchIssues();
}

//used to fetch infos from local storage
function fetchIssues(){
	const issues = JSON.parse(localStorage.getItem('issues'));
	let issuesListe = document.getElementById('issuesList');
	
	issuesListe.innerHTML = '';
	
	for(let i = 0;  i < issues.length; i++){
		let id = issues[i].id;
		let title = issues[i].title;
		let category = issues[i].category;
		let author = issues[i].author;
		let editor = issues[i].editor;
		let status = issues[i].status;
		
		issuesListe.innerHTML += '<div class="well">' +
								'<h6>Issue ID: ' + id + '</h6>'+
								'<p><span class="label label-info">' + status + '</span></p>'+
								'<h3>' + title + '</h3>'+
								'<p><span class="glyphicon glyphicon-time"></span> ' + category + '</p>'+
								'<p><span class="glyphicon glyphicon-user"></span> ' + author + '</p>'+
								'<p><span class="glyphicon glyphicon-user"></span> ' + editor + '</p>'+
								'<a href="#" onclick="setStatusRead(\''+id+'\')" class="btn btn-warning">Read</a> '+
								' <a href="#" onclick="deleteIssue(\'' +id+ '\')" class="btn btn-danger">Delete</a>'+
								'</div>';
								
	}							
}