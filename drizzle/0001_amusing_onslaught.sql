CREATE TABLE `Produto` (
	`Id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Nome` text NOT NULL,
	`Preco` text NOT NULL,
	`Descricao` text NOT NULL,
	`DataCadastro` text NOT NULL,
	`Ativo` integer DEFAULT false,
	`ClienteId` integer,
	FOREIGN KEY (`ClienteId`) REFERENCES `Cliente`(`Id`) ON UPDATE no action ON DELETE no action
);
