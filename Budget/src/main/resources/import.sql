-- sample entries
INSERT INTO entry(id, authorization_date, recipient, amount, entry_type, account_name) values (1, '2015-08-01', 'Harmons', 12.30, 'pos', 'visa');
INSERT INTO entry(id, authorization_date, recipient, amount, entry_type, account_name) values (2, '2015-08-01', 'Cafe Rio', 90.82, 'pos', 'visa');
INSERT INTO entry(id, authorization_date, recipient, amount, entry_type, account_name) values (3, '2015-08-01', 'Chevron', 112.34, 'gas', 'visa');
INSERT INTO entry(id, authorization_date, recipient, amount, entry_type, account_name) values (4, '2015-08-01', 'Walmart', 112.34, 'pos', 'visa');
INSERT INTO entry(id, authorization_date, recipient, amount, entry_type, account_name) values (5, '2015-08-01', 'Village Bake', 190.98, 'pos', 'visa');

INSERT INTO daily_total(id, total_date, bank, visa, budget, running) values (1, '2015-08-01', null, 518.82, 406.48, -328.48);

INSERT INTO entry(id, authorization_date, recipient, amount, entry_type, account_name) values (6, '2015-08-02', 'Chevron', 41.72, 'gas', 'visa');
INSERT INTO entry(id, authorization_date, recipient, amount, entry_type, account_name) values (7, '2015-08-02', 'Target', 241.72, 'pos', 'visa');
INSERT INTO entry(id, authorization_date, recipient, amount, entry_type, account_name) values (8, '2015-08-02', 'Seneca', 1704.02, 'bill', 'checking');

INSERT INTO daily_total(id, total_date, bank, visa, budget, running) values (2, '2015-08-02', 1704.02, 802.26, 648.20, -492.2);

