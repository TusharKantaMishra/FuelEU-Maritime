-- CreateTable
CREATE TABLE "routes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route_id" TEXT NOT NULL,
    "vessel_type" TEXT NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "ghg_intensity" REAL NOT NULL,
    "fuel_consumption" REAL NOT NULL,
    "distance" REAL NOT NULL,
    "total_emissions" REAL NOT NULL,
    "is_baseline" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ship_compliance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ship_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "cb_gco2eq" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "bank_entries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ship_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "amount_gco2eq" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "pools" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "pool_members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pool_id" INTEGER NOT NULL,
    "ship_id" TEXT NOT NULL,
    "cb_before" REAL NOT NULL,
    "cb_after" REAL NOT NULL,
    CONSTRAINT "pool_members_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "pools" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "routes_route_id_key" ON "routes"("route_id");

-- CreateIndex
CREATE INDEX "routes_year_idx" ON "routes"("year");

-- CreateIndex
CREATE INDEX "routes_vessel_type_idx" ON "routes"("vessel_type");

-- CreateIndex
CREATE INDEX "routes_fuel_type_idx" ON "routes"("fuel_type");

-- CreateIndex
CREATE INDEX "ship_compliance_ship_id_idx" ON "ship_compliance"("ship_id");

-- CreateIndex
CREATE INDEX "ship_compliance_year_idx" ON "ship_compliance"("year");

-- CreateIndex
CREATE UNIQUE INDEX "ship_compliance_ship_id_year_key" ON "ship_compliance"("ship_id", "year");

-- CreateIndex
CREATE INDEX "bank_entries_ship_id_year_idx" ON "bank_entries"("ship_id", "year");

-- CreateIndex
CREATE INDEX "pool_members_pool_id_idx" ON "pool_members"("pool_id");

-- CreateIndex
CREATE INDEX "pool_members_ship_id_idx" ON "pool_members"("ship_id");
