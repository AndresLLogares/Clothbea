import React, { useState, useEffect } from 'react';
import '../../scss/canvas/canvas.css';

const Canvas = () => {

    return (
        <div class="waveWrapper waveAnimation">
            <div class="waveWrapperInner bgTop">
                <div class="wave waveTop" ></div>
            </div>
            <div class="waveWrapperInner bgMiddle">
                <div class="wave waveMiddle" ></div>
            </div>
            <div class="waveWrapperInner bgBottom">
                <div class="wave waveBottom" ></div>
            </div>
        </div>
        )
}

export default Canvas;