

export default function AutoSaveStatus({statuscode}){

    return (
        <div className="statusCodeContainer">
            {(statuscode === 0)? ' ':''}
            {(statuscode === 1)? 'saving...':''}
            {(statuscode === 2)? 'document saved 👍':''}
        </div>
    );
}