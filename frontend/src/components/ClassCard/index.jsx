import React, { useState, useEffect } from "react";
import { MonthNames } from "../../utils/MonthNames";
import { Link, useLocation } from "react-router-dom";
import NewBookingForm from "../NewBookingForm";
import Loading from "../Loading";
import "./ClassCard.scss";

const ClassCard = ({ Title, Child, Class, param }) => {
  const [currentClass, setCurrentClass] = useState(Class);
  const location = useLocation();
  useEffect(() => {
    setCurrentClass(() => (Class ? Class : location.Class));
  }, [Class, location.Class]);

  return (
    <React.Fragment>
      {!currentClass ? (
        <Loading />
      ) : (
        <div className="classcard-body">
          <div className="classcard-main">
            {Title !== "" && <p>{Title}</p>}
            <div className="classcard-border">
              <div className="classcard-container">
                <div className="classcard-date">
                  <p>{new Date(currentClass.date).getDate().toString()}</p>
                  <p>
                    {
                      MonthNames[
                        new Date(currentClass.date).getMonth().toString()
                      ]
                    }
                  </p>
                </div>
                <div className="classcard-info">
                  <div className="classcard-top">
                    <div>
                      <p className="classcard-title">
                        {currentClass.className}
                      </p>
                      <p>{currentClass.scheduleType}</p>
                      <p>{currentClass.time}</p>
                    </div>
                    <div>
                      <a
                        href={currentClass.syllabusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="classcard-syllabus">
                          <p>Syllabus</p>
                          <i className="fas fa-book-open"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="classcard-bottom">
                    <p>0 volunteers signed up</p>
                    {Child == null && (
                      <Link
                        to={
                          param.user === "admin"
                            ? {
                                pathname: "/newbooking/admin",
                                Class: currentClass,
                              }
                            : { pathname: "/newbooking/", Class: currentClass }
                        }
                      >
                        Attend
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              {Child !== null && <hr className="classcard-separator"></hr>}
              {Child === "newBooking" && <NewBookingForm></NewBookingForm>}
              {Child === "volunteerslist" && (
                <h3>list of volunteers appear here</h3>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ClassCard;
