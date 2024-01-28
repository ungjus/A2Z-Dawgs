import React, { useMemo } from "react";

import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";

// import "react-quill/dist/quill.snow.css";

Quill.register('modules/imageResize', ImageResize);

type Props = {
    content: any,
    setContent: any
};


export default function MyAwesomeTextEditor({ content, setContent}: Props) {

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }]
            ],
        imageResize: {
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        }
    }

        

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
      
        "color",
        "background",
      
        "align",
        "direction",
        "indent",
        "table"
    ];

    return (

        <div>

            <ReactQuill

                modules={modules}

                formats={formats}

                value={content}

                onChange={(e) => setContent(e)}

            />

        </div>

    );

}