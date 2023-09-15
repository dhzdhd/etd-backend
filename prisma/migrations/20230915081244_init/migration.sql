-- CreateTable
CREATE TABLE "Audio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "svgs" TEXT[],
    "durations" INTEGER[],
    "url" TEXT NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);
