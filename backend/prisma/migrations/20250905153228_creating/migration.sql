-- CreateTable
CREATE TABLE `vehicle_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `wheels` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model_name` VARCHAR(100) NOT NULL,
    `vehicle_type_id` INTEGER NOT NULL,
    `is_available` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `vehicles_vehicle_type_id_idx`(`vehicle_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `vehicle_id` INTEGER NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `booking_status` ENUM('confirmed', 'cancelled') NOT NULL DEFAULT 'confirmed',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `booking_date_vehicle_index`(`vehicle_id`, `start_date`, `end_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_vehicle_type_id_fkey` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
