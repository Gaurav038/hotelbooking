import "./reserve.css"

function Reserve({setOpen, hotelId}) {
    return (
        <div className="reserve">
          <div className="rContainer">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="rClose"
              onClick={() => setOpen(false)}
            />
            <span>Select your rooms:</span>
            {data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">{item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room">
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleClick} className="rButton">
              Reserve Now!
            </button>
          </div>
        </div>
    );
};

export default Reserve