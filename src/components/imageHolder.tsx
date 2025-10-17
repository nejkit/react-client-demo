import React from "react";
import { withUserActivity } from "../decorators/withUserActivity";

interface ImageHolderProps {
    label?: string;
}

interface ImageHolderState {
    image: string | null;
    showConfirm: boolean;
}

export class ImageHolder extends React.Component<ImageHolderProps, ImageHolderState> {
    private readonly fileInputRef: React.RefObject<HTMLInputElement | null>;

    constructor(props: ImageHolderProps) {
        super(props);
        this.state = {
            image: null,
            showConfirm: false,
        };
        this.fileInputRef = React.createRef();
    }

    @withUserActivity("uploadPhoto")
    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            this.setState({ image: url, showConfirm: false });
        }
    }

    @withUserActivity("removePhoto")
    handleRemove() {
        this.setState({ image: null, showConfirm: false });
    }

    handleAvatarClick() {
        const { image } = this.state;
        if (image) {
            this.setState({ showConfirm: true });
        } else {
            this.fileInputRef.current?.click();
        }
    }

    render() {
        const { image, showConfirm } = this.state;

        return (
            <div className="relative flex flex-col items-center">
                {/* Аватар */}
                <div
                    onClick={() => this.handleAvatarClick()}
                    className={`w-40 h-40 rounded-full overflow-hidden border-2 ${
                        image ? "border-gray-600" : "border-gray-700"
                    } shadow-md cursor-pointer flex items-center justify-center bg-black/90 transition-transform duration-300 hover:scale-105 hover:border-blue-500`}
                >
                    {image ? (
                        <img
                            src={image}
                            alt="avatar"
                            className="w-full h-full object-cover"
                            style={{
                                maxWidth: "160px",
                                maxHeight: "160px",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500 text-center">
                            <div className="w-8 h-8 border-2 border-gray-500 rounded-full mb-2"></div>
                            <span className="text-xs opacity-80">
                                Натисніть, щоб додати фото
                            </span>
                        </div>
                    )}
                </div>

                {/* Прихований input */}
                <input
                    ref={this.fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={this.handleChange.bind(this)}
                    className="hidden"
                    hidden={true}
                />

                {/* Підтвердження видалення */}
                {showConfirm && (
                    <div className="absolute top-[110%] left-1/2 transform -translate-x-1/2 bg-[#2c2c2c] border border-gray-700 rounded-lg px-4 py-3 text-sm shadow-lg z-10">
                        <p className="text-gray-200 mb-2">Видалити фото?</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => this.handleRemove()}
                                className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-500 transition"
                            >
                                Так
                            </button>
                            <button
                                onClick={() => this.setState({ showConfirm: false })}
                                className="px-3 py-1 rounded-md bg-gray-600 text-white hover:bg-gray-500 transition"
                            >
                                Ні
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
