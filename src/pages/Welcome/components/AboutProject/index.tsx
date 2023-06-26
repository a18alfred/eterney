import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutProject = () => {
	const { t } = useTranslation();

	return (
		<>
			<p>
				{t('project_description1')}
			</p>
			<p>
				{t('project_description2')}
			</p>
			<p>
				{t('project_description3')}
			</p>
		</>
	);
};

export default AboutProject;
