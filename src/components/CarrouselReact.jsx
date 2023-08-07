import { useState } from "react"

const CarrouselReact = ({num, children}) => {
    const [posCarrousel, setPosCarrousel] = useState(0)
    const [posIndex, setPosIndex]           = useState(0)


    const styles = {
        "--num": num
    }
    
    const handleClickArrowLeft = ()=>{

        if(posCarrousel + 100/3 <= 0){
        const carrousel = document.getElementById("carrousel")
        carrousel.style.translate  = `${posCarrousel + 100/3}%`;

        setPosCarrousel(posCarrousel + 100/3);
        setPosIndex(posIndex - 1);
        }

    }
    const handleClickArrowRigth= ()=>{
        if(posCarrousel - 100/3 > -100){
            const carrousel = document.getElementById("carrousel")
            carrousel.style.translate  = `${posCarrousel - 100/3}%`;
    
            setPosCarrousel(posCarrousel - 100/3);
            setPosIndex(posIndex + 1);
        }

    }
  return (
        <div className="carrousel" style={styles}   >
            <div className="carrousel__dots">
                <span className="carrousel__dot"></span>
                <span className="carrousel__dot active"></span>
                <span className="carrousel__dot"></span>
            </div>
            <div className="carrousel__movil contain">
                <div onClick={handleClickArrowLeft} className="carrousel__arrow carrousel__arrow--left"  id="carrousel__arrow--left">
                <i class="fa-solid fa-arrow-left"></i>
                </div>
                <div className="carrousel__visible">
                <div className="carrousel__content" id="carrousel">
                    {children}
                </div>
                </div>
                
                <div onClick={handleClickArrowRigth} className="carrousel__arrow carrousel__arrow--rigth" id="carrousel__arrow--rigth">
                <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
           
            
        </div>
  )
}

export default CarrouselReact