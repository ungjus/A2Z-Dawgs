import { withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import Head from "next/head";
import React, { ChangeEvent, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import Image from 'next/image'
import Autocomplete from "react-google-autocomplete";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import dynamic from "next/dynamic";


const Draft = ({ user, error, isLoading }): JSX.Element => {

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const defaultDate = new Date().toLocaleDateString('en-CA')
    const DynamicTextEditor = useMemo(() => {

        return dynamic(() => import("../components/Editor"), {
        
        loading: () => <p>loading...</p>,
        
        ssr: false,
        
        });
        
    }, []);


    const [title, setTitle] = useState('');
    const [name, setName] = useState(user.name);
    const [date, setDate] = useState(defaultDate);
    const [address, setAddress] = useState<string>('')
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string|null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
        // Read the content of the file as a data URL
        const reader = new FileReader();
        reader.onloadend = () => {
            // Set the image preview URL
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        } else {
        // Reset the image preview if no file is selected
        setImagePreview(null);
        }
    };


    const handleSetName = (event: { target: { value: any; }; }) => {
        setName(event.target.value);
    };

    const handleSetDate = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDate(event.target.value);
    };

    const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };

    const handleAddressChange = (event: google.maps.places.PlaceResult) => {
        console.log(event)
        if (event && event.formatted_address) {
            setAddress(event.formatted_address);
            // convertPlaceIdToCoordinates(event.place_id)
        }
    };

    const handleContentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setContent(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Add logic to handle form submission
    };

    const handleReset = () => {
        setTitle('');
        setName(user.Name);
        setDate(defaultDate);
        setContent('');

    };

    const formatDate = (dateString: string): string => {
        const [year, month, day] = dateString.split('-');
        const formattedDate = new Date(`${year}-${month}-${day}T00:00:00Z`).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC', // Set the time zone to UTC
        });
      
        return formattedDate;
      };
      

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        // TODO
        // You will implement this next ...
    };

    const convertPlaceIdToCoordinates = async (place_id: string | number | boolean) => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?place_id=${encodeURIComponent(
              place_id
            )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
    
          if (!response.ok) {
            throw new Error('Failed to fetch coordinates');
          }
    
          const data = await response.json();
    
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            console.log(data.results[0].geometry.location)
          } else {
            console.log("error")
          }
        } catch (err) {
          console.log("error")
        }
      };

    return (
        <div className="flex flex-col sm:flex-row">
            <Head>
                <title>A-Z Dawgs - Create</title>
            </Head>

            {/* Left: Input Side */}
            <div className="w-full sm:w-1/2 p-4">
                <form onSubmit={handleSubmit}>
                    {/* Title  */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleSetName}
                            className="mt-1 p-2 w-1/2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Date */}
                    <div className="mb-4">
                        <label htmlFor="datePicker" className="block text-sm font-medium text-gray-700">
                            Date:
                        </label>
                        <input
                            type="date"
                            id="datePicker"
                            defaultValue={date}
                            onChange={handleSetDate}
                            className="mt-1 p-2 w-1/2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Search */}
                    <div className="mb-4">
                        <label htmlFor="formFile" className="mb-2 block text-sm font-medium text-gray-700">
                            Find Resturant
                        </label>
                        <Autocomplete 
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                            onPlaceSelected={handleAddressChange}
                            options={{
                                types: ["establishment"]
                            }}
                            libraries={
                                ["places", 'geometry']
                            }
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Cover Image */}
                    <div className="mb-4">
                        <label htmlFor="formFile" className="mb-2 block text-sm font-medium text-gray-700">
                        Upload cover image
                        </label>
                        <input
                            className="border border-gray-300 rounded text-sm transition duration-300 ease-in-out hover:file:bg-neutral-200"
                            type="file"
                            id="formFile"
                            onChange={handleFileChange}
                        />
                    </div>


                    {/* Main Content */}
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content:
                        </label>
                        {/* <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            rows={8}
                        /> */}
                        {/* <ReactQuill 
                            id="content"
                            theme="snow" 
                            value={content} 
                            onChange={setContent} 
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            // modules={modules}
                            // formats={formats}
                        /> */}
                        <DynamicTextEditor content={content} setContent={handleContentChange} />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        Publish
                    </button>
                    <button type="reset" onClick={handleReset} className="py-2 px-4"> Reset</button>
                </form>
            </div>

            {/* Right: Preview Side */}
            <article className="w-full sm:w-1/2 p-4 border-t sm:border-t-0 sm:border-l font-sans">
                {/* <ReactMarkdown children={'# ' + title} /> */}
                {title &&
                    <div>
                        <p className="text-3xl font-bold">{title}</p>
                        <span className="pr-2">{name}</span>
                        <span>{formatDate(date)}</span>
                        <p className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                fill="#d9534f"
                                className="mr-2"
                                >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                                />
                                <circle cx="12" cy="9" r="1.5" fill="#ffffff" />
                            </svg>
                            <span>{address}</span>
                        </p>
                        <hr className="h-px my-4 bg-gray-200 border-0"/>
                    </div>
                }

                {imagePreview  && (
                    <figure
                        className="text-center">
                        <Image
                            width="0"
                            height="0"
                            className="w-1/2 h-1/2 flex m-auto object-cover rounded-xl"
                            src={imagePreview}
                            alt={"test"}
                        />
                        <ReactMarkdown children={"*test this is*"} />
                    </figure>
                )}
                {/* <ReactMarkdown children={content} /> */}

                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
            </article>
        </div>
    )
}

export default withPageAuthRequired(Draft);