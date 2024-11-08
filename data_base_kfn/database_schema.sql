- Create Region table
CREATE TABLE Region (
    RegionID INT PRIMARY KEY,
    Name CHAR(100)
);

-- Create User table
CREATE TABLE User (
    UserID INT PRIMARY KEY,
    Name CHAR(100),
    Password CHAR(100),
    RegionID INT,
    FOREIGN KEY (RegionID) REFERENCES Region(RegionID)
);

-- Create Event table
CREATE TABLE Event (
    EventID INT PRIMARY KEY,
    EventName CHAR(100),
    Venue CHAR(100)
);

-- Create Interests table
CREATE TABLE Interests (
    InterestID INT PRIMARY KEY,
    InterestName CHAR(100)
);

-- Create UserEvents junction table for many-to-many relationship between User and Event
CREATE TABLE UserEvents (
    UserID INT,
    EventID INT,
    PRIMARY KEY (UserID, EventID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
);

-- Create UserInterests junction table for many-to-many relationship between User and Interests
CREATE TABLE UserInterests (
    UserID INT,
    InterestID INT,
    PRIMARY KEY (UserID, InterestID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (InterestID) REFERENCES Interests(InterestID)
);