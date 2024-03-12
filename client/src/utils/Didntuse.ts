export const insertTextFunc = ({
  position,
  text,
  HTMLEditor,
}: {
  position: { lineNumber: number; column: number };
  text: string;
  HTMLEditor: any;
}) => {
  if (HTMLEditor) {
    // Get the current cursor position

    if (position) {
      // Get the current content of the editor
      const currentCode = HTMLEditor?.getValue();

      // Calculate the offset of the cursor position
      const offset = HTMLEditor?.getModel().getOffsetAt(position);

      // Generate the new code with the inserted text

      const newCode =
        currentCode.substring(0, offset) + text + currentCode.substring(offset);

      // Set the new code
      HTMLEditor.executeEdits("", [
        {
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
          },
          text,
          forceMoveMarkers: true,
        },
      ]);

      // Update the editor's value
      HTMLEditor.setValue(newCode);
    }
  }
};
