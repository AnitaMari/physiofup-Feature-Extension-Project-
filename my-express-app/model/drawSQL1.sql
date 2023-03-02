-- DROP TABLE if exists exercises;

-- -- TRUNCATE TABLE programs;
-- DROP TABLE if exists programs;

-- -- TRUNCATE TABLE patients;
-- DROP TABLE if exists patients;

CREATE TABLE patients (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    birthDate DATE,
    email VARCHAR(40)
);

INSERT INTO patients (firstName, lastName, birthDate, email)
   VALUES ('Leonor', 'Gutierrez', '1964-10-30', 'leonorg@gmail.com'),
          ('Estíbaliz', 'Almaraz', '1994-12-05', 'estibaaliz@gmail.com'),
          ('Javier', 'Almaraz', '1963-04-14', 'javiraz@telefonica.net');

CREATE TABLE programs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    programTitle VARCHAR(100),
    creationDate DATE,
    patientId INT,
    FOREIGN KEY (patientId) REFERENCES patients(id)
);

INSERT INTO programs (programTitle, creationDate, patientId)
  VALUES ('Cervicalgia', '2023-02-01', 3),
         ('Low-back pain', '2023-02-01', 1),
         ('Ankle Sprain LEL', '2023-02-01', 1);

CREATE TABLE exercises (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    exerciseName VARCHAR(100),
    video VARCHAR(100),
    series BIGINT,
    repetitions BIGINT,
    notes VARCHAR(250),
    programId INT,
    FOREIGN KEY (programId) REFERENCES programs(id)
);

INSERT INTO exercises (exerciseName, video, series, repetitions, notes, programId )
   VALUES ("Cervical Flexion", "videoFlex", 3, 15, "Sit down with your back straight...", 1 ),
          ("Cervical Rotation", "videoRot", 3, 15, "Sit down with your back straight...", 1 ),
          ("Cervical Extension", "videoExt", 3, 15, "Sit down with your back straight...", 1 ),
          ("GluteBridge", "videoBridge", 3, 10, "Lay down with your back straight on the floor...", 2 );
                

   
   
   -- ​
-- ALTER TABLE
--     `PATIENTS` ADD PRIMARY KEY `patients_id_primary`(`id`);
-- CREATE TABLE `PROGRAMS`(
--     `programTitle` VARCHAR(255) NOT NULL,
--     `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--     `date` DATE NOT NULL
-- );
-- ALTER TABLE
--     `PROGRAMS` ADD INDEX `programs_id_index`(`id`);
-- CREATE TABLE `EXERCISES`(
--     `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--     `exerciseName` VARCHAR(255) NOT NULL,
--     `video` VARCHAR(255) NOT NULL,
--     `series` BIGINT NOT NULL,
--     `repetitions` BIGINT NOT NULL,
--     `notes` VARCHAR(200) NOT NULL
-- );
-- ALTER TABLE
--     `EXERCISES` ADD INDEX `exercises_id_index`(`id`);
-- ALTER TABLE
--     `PROGRAMS` ADD CONSTRAINT `programs_id_foreign` FOREIGN KEY(`id`) REFERENCES `PATIENTS`(`id`);