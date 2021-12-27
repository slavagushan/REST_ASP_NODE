async function GetMusics() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/music", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const musics= await response.json();
        let rows = document.querySelector("tbody"); 
        musics.forEach(music => {
            // добавляем полученные элементы в таблицу
            rows.append(row(music));
        });
    }
}
// Получение одного пользователя
async function GetMusic(id) {
    const response = await fetch("/api/music/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const music = await response.json();
        const form = document.forms["musicForm"];
        form.elements["id"].value = music.id;
        form.elements["name"].value = music.name;
        form.elements["age"].value = music.age;
    }
}
// Добавление пользователя
async function CreateMusic(musicName, musicAge) {

    const response = await fetch("api/music", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: musicName,
            age: parseInt(musicAge, 10)
        })
    });
    if (response.ok === true) {
        const music = await response.json();
        reset();
        document.querySelector("tbody").append(row(music));
    }
}
// Изменение пользователя
async function EditMusic(musicId, musicName, musicAge) {
    const response = await fetch("api/music", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: musicId,
            name: musicName,
            age: parseInt(musicAge, 10)
        })
    });
    if (response.ok === true) {
        const music = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + music.id + "']").replaceWith(row(music));
    }
}
// Удаление пользователя
async function DeleteMusic(id) {
    const response = await fetch("/api/music/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const music = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + music.id + "']").remove();
    }
}
function reset() {
    const form = document.forms["musicForm"];
    form.reset();
    form.elements["id"].value = 0;
}

function row(music) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", music.id);

    const idTd = document.createElement("td");
    idTd.append(music.id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(music.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(music.age);
    tr.append(ageTd);
      
    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", music.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        GetMusic(music.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", music.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        DeleteMusic(music.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
// отправка формы
document.forms["musicForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["musicForm"];
    const id = form.elements["id"].value;
    const name = form.elements["name"].value;
    const age = form.elements["age"].value;
    if (id == 0)
        CreateMusic(name, age);
    else
        EditMusic(id, name, age);
});

GetMusics();