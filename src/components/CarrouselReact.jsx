import { useState } from "react"

const CarrouselReact = ({num, children}) => {
    const [posCarrousel, setPosCarrousel] = useState(0)
    const [posIndex, setPosIndex]           = useState(0)
    const [positionStyle, setPositionStyle] = useState({})

    const styles = {
        "--num": num
    }

    const dots = (num)=>{
        let nums = []
        for(let i =0; i<num; i++){
            nums.push(i)
        }
        return nums
    }
    
    const handleClickArrowLeft = ()=>{

        if(posCarrousel + 100/num <= 0){
        setPositionStyle({
                "translate": `${posCarrousel + 100/num}%`
        })
        setPosCarrousel(posCarrousel + 100/num);
        setPosIndex(posIndex - 1);
        }

    }
    const handleClickArrowRigth= ()=>{
        if(posCarrousel - 100/num > -100){
            setPositionStyle({
                "translate": `${posCarrousel - 100/num}%`
            })
            setPosCarrousel(posCarrousel - 100/num);
            setPosIndex(posIndex + 1);
        }

    }
  return (
        <div className="carrousel" style={styles}   >
            <div className="carrousel__dots">
                {dots(num).map(dot =>(
                    <span 
                    key={dot}
                    className={`carrousel__dot ${posIndex == dot ? "active" : ""}`}></span>
                ))}
            
            </div>
            <div className="carrousel__movil contain">
                <div onClick={handleClickArrowLeft} className="carrousel__arrow carrousel__arrow--left"  id="carrousel__arrow--left">
                <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="carrousel__visible">
                <div style={positionStyle} className="carrousel__content">
                    {children}
                </div>
                </div>
                
                <div onClick={handleClickArrowRigth} className="carrousel__arrow carrousel__arrow--rigth" id="carrousel__arrow--rigth">
                <i className="fa-solid fa-arrow-right"></i>
                </div>
            </div>
           
            
        </div>
  )
}

export default CarrouselReact