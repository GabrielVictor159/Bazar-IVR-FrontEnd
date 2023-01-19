export default class AnimationIntersection{
    constructor(){}
   oberseve = (array, finish) => {
    try{
        const intersectionObserver = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting === true)) {
            entries.map((value, index) => {
              if (value.isIntersecting) {
                array.map((item) => {
                 if(value.target.id===item.name){
                    
                    this.animation(item)
                    
                 }
                })
    
              }
            })
          }
    
        })
        if (finish) {
          intersectionObserver.disconnect();
        }
        else {
          array.map((value, index) => {
            if (value.array !== undefined) {
              value.array.map((item, index) => {
                intersectionObserver.observe(document.getElementById(`${value.name}_${index}`))
              })
            }
            else {
              intersectionObserver.observe(document.getElementById(value.name))
            }
          })
        }
    }
    catch(exception){
        console.log(exception.message)

    }
      }
  animation = (item) => {
        const a = (properties) => {
          document.getElementById(item.name).style.animation = properties;
        }
        if (item.animationPropertie === undefined) {
          a(`${item.animationName} 2s ease-in-out 0s 1 normal forwards`);
        }
        else {
          a(`${item.animationName} ${item.animationPropertie}`)
        }
      }
}