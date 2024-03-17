import { useState } from 'react';
import Slide1 from '../static/slider-images/slide1.jpg';
import Slide2 from '../static/slider-images/slide2.jpg';
import Slide3 from '../static/slider-images/slide3.jpg';
import Slide4 from '../static/slider-images/slide4.jpg';
import Slide5 from '../static/slider-images/slide5.jpg';

export const Slider = () => {

    const [selectedSlide, setSelectedSlide] = useState(1);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const handleChangeSlide = (e) => {
        const slides = document.getElementsByClassName('slide');
        for (const slide of slides) {
            slide.classList.add('hidden');
        }
        setSelectedSlide(Number(e.target.id));
    }

    const handleImageLoad = () => {
        setImagesLoaded(true);
    }

    return (
        <>            
            <div id='slider-wrapper' className='mt-24'>
                <div className=' bg-gray-800 p-5 flex flex-col'>
                    <div id="slider" className="max-w-200 text-center scroll-smooth relative aspect-video flex overflow-x-hidden">
                        <img onLoad={handleImageLoad} id='slide-1' className={`${selectedSlide === 1 ? 'visible' : 'hidden'} animate-fade ${!imagesLoaded ? 'bg-[#f0f0f0] animate-pulse' : null}`} src={Slide1} alt='Slide 1' />
                        <img onLoad={handleImageLoad} id='slide-2' className={`${selectedSlide === 2 ? 'visible' : 'hidden'} animate-fade ${!imagesLoaded ? 'bg-[#f0f0f0] animate-pulse' : null}`} src={Slide2} alt='Slide 2' />
                        <img onLoad={handleImageLoad} id='slide-3' className={`${selectedSlide === 3 ? 'visible' : 'hidden'} animate-fade ${!imagesLoaded ? 'bg-[#f0f0f0] animate-pulse' : null}`} src={Slide3} alt='Slide 3' />
                        <img onLoad={handleImageLoad} id='slide-4' className={`${selectedSlide === 4 ? 'visible' : 'hidden'} animate-fade ${!imagesLoaded ? 'bg-[#f0f0f0] animate-pulse' : null}`} src={Slide4} alt='Slide 4' />
                        <img onLoad={handleImageLoad} id='slide-5' className={`${selectedSlide === 5 ? 'visible' : 'hidden'} animate-fade ${!imagesLoaded ? 'bg-[#f0f0f0] animate-pulse' : null}`} src={Slide5} alt='Slide 5' />
                    </div>
                    <div className='flex justify-center text-slate-300'>
                        <p className={`${selectedSlide === 1 ? 'visible' : 'hidden'} animate-fade text-3xl`}>Juega online contra otros jugadores</p>
                        <p className={`${selectedSlide === 2 ? 'visible' : 'hidden'} animate-fade text-3xl`}>Juega online contra otros</p>
                        <p className={`${selectedSlide === 3 ? 'visible' : 'hidden'} animate-fade text-3xl`}>Juega online contra</p>
                        <p className={`${selectedSlide === 4 ? 'visible' : 'hidden'} animate-fade text-3xl`}>Juega online contra otr</p>
                        <p className={`${selectedSlide === 5 ? 'visible' : 'hidden'} animate-fade text-3xl`}>Juega online contra  jugadores</p>
                    </div>
                </div>
                <div className='flex justify-center gap-x-2 mt-3'>
                    <div onClick={handleChangeSlide} id='1' className={`w-3 h-3 cursor-pointer rounded-lg bg-gray-200 ${selectedSlide === 1 ? 'opacity-25' : null} hover:opacity-25`} />
                    <div onClick={handleChangeSlide} id='2' className={`w-3 h-3 cursor-pointer rounded-lg bg-gray-200 ${selectedSlide === 2 ? 'opacity-25' : null} hover:opacity-25`} />
                    <div onClick={handleChangeSlide} id='3' className={`w-3 h-3 cursor-pointer rounded-lg bg-gray-200 ${selectedSlide === 3 ? 'opacity-25' : null} hover:opacity-25`} />
                    <div onClick={handleChangeSlide} id='4' className={`w-3 h-3 cursor-pointer rounded-lg bg-gray-200 ${selectedSlide === 4 ? 'opacity-25' : null} hover:opacity-25`} />
                    <div onClick={handleChangeSlide} id='5' className={`w-3 h-3 cursor-pointer rounded-lg bg-gray-200 ${selectedSlide === 5 ? 'opacity-25' : null} hover:opacity-25`} />
                </div>
            </div>
        </>
    )
}