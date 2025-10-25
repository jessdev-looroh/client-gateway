// import { Inject, Injectable, Logger } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';
// import { NATS_SERVICE } from '../../config';

// /**
//  * Service responsible for coordinating data migration between microservices
//  * When an anonymous user converts to registered, this service coordinates
//  * the migration of their data across all microservices
//  */
// @Injectable()
// export class DataMigrationService {
//   private readonly logger = new Logger(DataMigrationService.name);

//   constructor(
//     @Inject(NATS_SERVICE)
//     private readonly client: ClientProxy,
//   ) {}

//   /**
//    * Migrates user data from anonymous to registered user across all microservices
//    * @param anonymousUserId - ID of the anonymous user
//    * @param newUserId - ID of the new registered user
//    * @returns Success status of migration
//    */
//   async migrateUserData(anonymousUserId: string, newUserId: string): Promise<boolean> {
//     try {
//       this.logger.log(`Starting data migration from ${anonymousUserId} to ${newUserId}`);

//       // Migrate orders data
//       const ordersMigration = await this.migrateOrdersData(anonymousUserId, newUserId);
      
//       // Migrate cart data (if exists)
//       const cartMigration = await this.migrateCartData(anonymousUserId, newUserId);
      
//       // Migrate preferences data (if exists)
//       const preferencesMigration = await this.migratePreferencesData(anonymousUserId, newUserId);

//       const allSuccessful = ordersMigration && cartMigration && preferencesMigration;

//       if (allSuccessful) {
//         this.logger.log(`Data migration completed successfully for user ${newUserId}`);
//       } else {
//         this.logger.warn(`Data migration completed with some failures for user ${newUserId}`);
//       }

//       return allSuccessful;
//     } catch (error) {
//       this.logger.error(`Error during data migration: ${error.message}`);
//       return false;
//     }
//   }

//   /**
//    * Migrates orders data from anonymous to registered user
//    * @param anonymousUserId - Anonymous user ID
//    * @param newUserId - New registered user ID
//    * @returns Success status
//    */
//   private async migrateOrdersData(anonymousUserId: string, newUserId: string): Promise<boolean> {
//     try {
//       await firstValueFrom(
//         this.client.send('migrate.user.orders', {
//           anonymousUserId,
//           newUserId,
//         }),
//       );
//       return true;
//     } catch (error) {
//       this.logger.error(`Error migrating orders data: ${error.message}`);
//       return false;
//     }
//   }

//   /**
//    * Migrates cart data from anonymous to registered user
//    * @param anonymousUserId - Anonymous user ID
//    * @param newUserId - New registered user ID
//    * @returns Success status
//    */
//   private async migrateCartData(anonymousUserId: string, newUserId: string): Promise<boolean> {
//     try {
//       await firstValueFrom(
//         this.client.send('migrate.user.cart', {
//           anonymousUserId,
//           newUserId,
//         }),
//       );
//       return true;
//     } catch (error) {
//       this.logger.error(`Error migrating cart data: ${error.message}`);
//       return false;
//     }
//   }

//   /**
//    * Migrates user preferences from anonymous to registered user
//    * @param anonymousUserId - Anonymous user ID
//    * @param newUserId - New registered user ID
//    * @returns Success status
//    */
//   private async migratePreferencesData(anonymousUserId: string, newUserId: string): Promise<boolean> {
//     try {
//       await firstValueFrom(
//         this.client.send('migrate.user.preferences', {
//           anonymousUserId,
//           newUserId,
//         }),
//       );
//       return true;
//     } catch (error) {
//       this.logger.error(`Error migrating preferences data: ${error.message}`);
//       return false;
//     }
//   }
// }
