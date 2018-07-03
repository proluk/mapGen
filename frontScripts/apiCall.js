function apiCall(method,canvas){
    fetch(`http://localhost:3001/${method}`).then(response => {
        response.json().then((data) => {
            paintMapOnCanvas(data.map, canvas);
        });
    });
}
function apiCallPost(canvas){
    fetch('http://localhost:3001/makeImage',{
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                canvas:canvas.toDataURL()
            })
    }).then(console.log("Wygenerowano obrazek"));
}