-- Eliminar tablas si existen
DROP TABLE IF EXISTS NeedyUserFavorites;
DROP TABLE IF EXISTS Administrators;
DROP TABLE IF EXISTS NeedyUsers;
DROP TABLE IF EXISTS OSCs;

-- Administradores
CREATE TABLE Administrators (
    id INT AUTO_INCREMENT,
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL, 
    fullName VARCHAR(64) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Usuarios Necesitados
CREATE TABLE NeedyUsers (
    id INT AUTO_INCREMENT,
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL,
    fullName VARCHAR(64) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- OSCs
CREATE TABLE OSCs (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contactEmail VARCHAR(100),
    contactPhone VARCHAR(15),
    category VARCHAR(64),
    status ENUM('Pendiente', 'Aprobado', 'Rechazado') NOT NULL DEFAULT 'Pendiente', -- Campo de estado
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Favoritos de Usuarios Necesitados
CREATE TABLE NeedyUserFavorites (
    userId INT NOT NULL,
    oscId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, oscId),
    FOREIGN KEY (userId) REFERENCES NeedyUsers(id),
    FOREIGN KEY (oscId) REFERENCES OSCs(id)
);
