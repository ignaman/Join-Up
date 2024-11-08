- Create Region table
CREATE TABLE Region (
    RegionID INT PRIMARY KEY,
    Name CHAR(100)
);

CREATE TABLE User (
    UserID INT PRIMARY KEY,
    Name CHAR(100),
    Password CHAR(100),
    RegionID INT,
    FOREIGN KEY (RegionID) REFERENCES Region(RegionID)
);

CREATE TABLE Event (
    EventID INT PRIMARY KEY,
    EventName CHAR(100),
    Venue CHAR(100)
);

CREATE TABLE Interests (
    InterestID INT PRIMARY KEY,
    InterestName CHAR(100)
);

CREATE TABLE UserEvents (
    UserID INT,
    EventID INT,
    PRIMARY KEY (UserID, EventID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
);

CREATE TABLE UserInterests (
    UserID INT,
    InterestID INT,
    PRIMARY KEY (UserID, InterestID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (InterestID) REFERENCES Interests(InterestID)
);