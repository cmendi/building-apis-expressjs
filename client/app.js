const chirpDiv = $("#chirps");
let chirpId;
let chirpUserName;

$.ajax({
	url: "/api/chirps/",
	type: "GET",
	success: function (data) {
		Object.keys(data).forEach((id) => {
			if (data[id].name !== undefined || data[id].text !== undefined) {
				let user = data[id].name;
				let message = data[id].text;
				let chirp = $(
					`<div data-id='${id}' class="chirp m-4 p-4 shadow rounded border border-black" data-toggle='modal' data-target='#myModal${id}'><div class="d-flex justify-content-end"><button data-id='${id}' class="chirpDelete btn-close position-absolute"></button></div><h3>${user}</h3><p>${message}</p></div>`
				);
				chirpDiv.append(chirp);
				$(".chirpDelete").click(deleteChirp);
				$(".chirp").click(updateChirp);
				// console.log(user);
			}
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

	$.ajax({
		url: "/api/chirps/",
		type: "POST",
		data: chirpObj,
		success: () => {
			location.href = "/";
		},
	});
}

function updateChirp() {
	chirpId = $(this).data("id");
	chirpUserName = $(`[data-id='${chirpId}'] h3`).text();
	$("#modalUserName").val(chirpUserName);
	$("#myModal").modal("show");
	const chirpMessage = $(`[data-id='${chirpId}'] p`).text();
	$("#modalText").val(chirpMessage);
}

function saveUpdateChirp() {
	const updateMessage = $("#modalText").val();
	const updateUserName = $("#modalUserName").val();

	$.ajax({
		url: "/api/chirps/" + chirpId,
		type: "PUT",
		data: { name: updateUserName, text: updateMessage },
		success: () => {
			location.href = "/";
		},
		error: function (xhr, textStatus, error) {
			console.error(error);
		},
	});
}

function deleteChirp() {
	const id = $(this).attr("data-id");
	$.ajax({
		url: "/api/chirps/" + id,
		type: "DELETE",
		success: () => {
			location.href = "/";
		},
	});
}
