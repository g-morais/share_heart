function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function(e) {
            document.getElementById("preview").src = e.target.result;
            document.getElementById("photo").style.border = "none";
            document.getElementById("photo").style.justifyContent = "left";
            document.getElementById("arquivo").style.display = "none";
            document.getElementById("arquivo-img").style.display = "none";
        };       
        file.readAsDataURL(this.files[0]);
    }
}
document.getElementById("arquivo").addEventListener("change", readImage, false);