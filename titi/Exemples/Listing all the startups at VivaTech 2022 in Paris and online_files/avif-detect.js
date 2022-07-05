  const F = async (a) => {
    document.documentElement.classList.add(a);
  }

  const detectAvif = async() => {
    return new Promise(resolve => {
      var A = new Image();
      (A.src =
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),
        (A.onload = async function () {
          await F("avif");
          resolve(true);
        }),
        (A.onerror = function () {
          var a = new Image();
          (a.src =
            "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="),
            (a.onload = async function () {
              await G("webp");
              resolve(true);
            }),
            (a.onerror = function(){
              resolve(true);
            });
        });
    });
}

const detect = detectAvif();  