var Markdown = require('react-remarkable');

export default function Preview({ text }){

    return (
        <div className="preview ">
            <Markdown source={ text } />
              <div></div>
        </div>
    );
}