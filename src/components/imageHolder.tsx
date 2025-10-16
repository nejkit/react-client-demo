import React from "react";
import { withUserActivity } from "../decorators/withUserActivity";

interface ImageHolderProps {
    label: string;
}

interface ImageHolderState {
    image: string | null;
}

export class ImageHolder extends React.Component<ImageHolderProps, ImageHolderState> {
    constructor(props: ImageHolderProps) {
        super(props);
        this.state = {
            image: null,
        };
    }

    @withUserActivity("uploadPhoto")
    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            this.setState({ image: url });
        }
    }

    @withUserActivity("removePhoto")
    handleRemove() {
        this.setState({ image: null });
    }

    render() {
        const { label } = this.props;
        const { image } = this.state;

        return (
            <div className="border p-4 rounded-2xl flex flex-col items-center gap-2 shadow-md">
                <span className="text-sm text-gray-600">{label}</span>

                {image ? (
                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={image}
                            alt="preview"
                            className="w-32 h-32 object-cover rounded-xl"
                        />
                        <button
                            type="button"
                            onClick={this.handleRemove.bind(this)}
                            className="text-red-500 text-sm hover:underline"
                        >
                            Удалить фото
                        </button>
                    </div>
                ) : (
                    <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
                        No image
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}
