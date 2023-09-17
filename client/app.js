const chirpDiv = $("#chirps");

$.ajax({
	url: "/api/chirps/",
	type: "GET",
	success: function (data) {
		Object.keys(data).forEach((id) => {
			let user = data[id].name;
			let message = data[id].text;
			let chirp = $(
				`<div id='${id}' class="col-12 p-4 shadow rounded border border-black"><div class="d-flex justify-content-end"><button id="chirpDelete" class="btn-close position-absolute"></button></div><h3>${user}</h3><p>${message}</p></div>`
			);
			chirpDiv.append(chirp);
			$("#chirpDelete").click(deleteChirp);
			// console.log(user);
		});
	},
	error: function (xhr, textStatus, error) {
		console.error(error);
	},
});

function createChirp() {
	let name = $("#name").val();
	let message = $("#text").val();
	let chirpObj = { name: name, text: message };
}

function deleteChirp() {
	const id = $(this).attr("id");
	$.ajax({
		url: "/api/chirps/" + id,
		type: "DELETE",
		success: (data) => {
			location.href = "/";
		},
	});
}
