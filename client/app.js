const chirpDiv = $("#chirps");
let chirpId;
let chirpUserName;

// Fetch data
$.ajax({
	url: "/api/chirps/",
	type: "GET",
	success: function (data) {
		Object.keys(data).forEach((id) => {
			// This took me a long time to find. I didnt want the undefined data to show but i did it lol.
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

	// No idea what xhr or textStatus do. I just found out how to use $.ajax on stack overflow.
	error: function (xhr, textStatus, error) {
		console.error(error);
	},
});

// Create chirp
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
		error: function (xhr, textStatus, error) {
			console.error(error);
		},
	});
}
// Update chirp
function updateChirp() {
	chirpId = $(this).data("id");
	// Keep the same username when updating chirp.
	chirpUserName = $(`[data-id='${chirpId}'] h3`).text();
	$("#modalUserName").val(chirpUserName);
	// Show modal when chirp div is clicked.
	$("#myModal").modal("show");
	const chirpMessage = $(`[data-id='${chirpId}'] p`).text();
	$("#modalText").val(chirpMessage);
}

// Save the user's name but update the message the user edits.
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

// Delete chirp
function deleteChirp() {
	const id = $(this).attr("data-id");
	$.ajax({
		url: "/api/chirps/" + id,
		type: "DELETE",
		success: () => {
			location.href = "/";
		},
		error: function (xhr, textStatus, error) {
			console.error(error);
		},
	});
}
