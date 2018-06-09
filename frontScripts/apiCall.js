function apiCall(method,canvas){
    fetch(`http://localhost:3001/${method}`).then(response => {
        response.json().then((data) => {
            paintMapOnCanvas(data.map, canvas);
        });
    });
}