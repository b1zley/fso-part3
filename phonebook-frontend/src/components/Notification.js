const Notification = ({ message }) => {
    

    const errorNotificationStyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 20,

        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 20,

        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    if (message.isError === false) {
        return (
            <div style={notificationStyle}>
                {message.content}
            </div>
        )
    }

    if (message.isError === true) {
        return (
            <div style={errorNotificationStyle}>
                {message.content}
            </div>
        )
    }




}

export default Notification