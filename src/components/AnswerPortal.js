import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const editorOptions = {
	height: "500px",
	buttonList: [
		["undo", "redo"],
		["removeFormat"],
		["formatBlock"],
		["indent", "outdent"],
		["bold", "underline", "italic", "strike", "subscript", "superscript"],
		["align", "horizontalRule", "list"],
		["table", "link"],
		["showBlocks", "codeView"],
		["print"],
	],
	formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
};

export default function SunEditorComponent({ setAnswer, setStyledAnswer }) {
	const editor = React.useRef();

	const [loading, setLoading] = React.useState(false);

	const getSunEditorInstance = (sunEditor) => {
		editor.current = sunEditor;
	};

	const handleChange = (e) => {
		setAnswer(editor.current.getText());
		console.info(editor.current.getText());
		setStyledAnswer(e);
	};
	return (
		<SunEditor
			setOptions={editorOptions}
			// onKeyDown={handleKeyDown}
			getSunEditorInstance={getSunEditorInstance}
			setAllPlugins={true}
			height="500"
			width="100%"
			lang="en"
			placeholder="Type your answer here..."
			onChange={handleChange}
		/>
	);
}
