﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class MovieScreeningUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieScreenings_Movies_MovieId",
                table: "MovieScreenings");

            migrationBuilder.AlterColumn<Guid>(
                name: "MovieId",
                table: "MovieScreenings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieScreenings_Movies_MovieId",
                table: "MovieScreenings",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieScreenings_Movies_MovieId",
                table: "MovieScreenings");

            migrationBuilder.AlterColumn<Guid>(
                name: "MovieId",
                table: "MovieScreenings",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieScreenings_Movies_MovieId",
                table: "MovieScreenings",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id");
        }
    }
}
