import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../Assets/hydopower.jpg";
const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);

    const [loading,setLoading]=useState(false);

    const ImageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true);
        const respone = await fetch(
            // "<url>",
            {
                method: "Post",
                headers: {
                    "Content-type": "application/json",
                    Authorization:
                        // "Bearer <othorised key>"
                        "",
                    "user-Agent": "Chrome",

                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),

            }
        );
        let data = await respone.json();
        let data_array = data.data;
        setImage_url(data_array[0].url)
        setLoading(false);
    };

    return (
        <div className="ai-image-generator">
            <div className="header">
                Ai image <span>generator</span>
            </div>
            <div className="img-loading">
                <div className="image">
                    <img
                        src={image_url === "/" ? default_image : image_url}
                        alt=""
                        height="300px"
                    ></img>
                </div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading.....</div>
                </div>
            </div>
            <div className="search-box">
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Describe What You Want To See"
                    className="search-input"
                />
                <div className="generator-btn" onClick={() => { ImageGenerator() }}>Generator</div>
            </div>
        </div>
    );
};
export default ImageGenerator;
