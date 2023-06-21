/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import amazonS3 from 'assets/img/service-icon-amazon-s3.svg';
import gcs from 'assets/img/service-icon-gcs.png';
import msAzure from 'assets/img/service-icon-ms-azure.png';
import { PipelineType } from 'generated/api/services/ingestionPipelines/createIngestionPipeline';
import { WorkflowStatus } from 'generated/entity/automations/workflow';
import { StorageServiceType } from 'generated/entity/data/container';
import { ServiceType } from 'generated/entity/services/serviceType';
import { map, startCase } from 'lodash';
import { ServiceTypes, StepperStepType } from 'Models';
import i18n from 'utils/i18next/LocalUtil';
import addPlaceHolder from '../assets/img/add-placeholder.svg';
import airbyte from '../assets/img/Airbyte.png';
import noDataFound from '../assets/img/no-data-placeholder.svg';
import noService from '../assets/img/no-service.png';
import airflow from '../assets/img/service-icon-airflow.png';
import amundsen from '../assets/img/service-icon-amundsen.png';
import athena from '../assets/img/service-icon-athena.png';
import atlas from '../assets/img/service-icon-atlas.svg';
import azuresql from '../assets/img/service-icon-azuresql.png';
import clickhouse from '../assets/img/service-icon-clickhouse.png';
import dagster from '../assets/img/service-icon-dagster.png';
import databrick from '../assets/img/service-icon-databrick.png';
import datalake from '../assets/img/service-icon-datalake.png';
import deltalake from '../assets/img/service-icon-delta-lake.png';
import domo from '../assets/img/service-icon-domo.png';
import druid from '../assets/img/service-icon-druid.png';
import dynamodb from '../assets/img/service-icon-dynamodb.png';
import fivetran from '../assets/img/service-icon-fivetran.png';
import glue from '../assets/img/service-icon-glue.png';
import hive from '../assets/img/service-icon-hive.png';
import ibmdb2 from '../assets/img/service-icon-ibmdb2.png';
import impala from '../assets/img/service-icon-impala.png';
import kafka from '../assets/img/service-icon-kafka.png';
import kinesis from '../assets/img/service-icon-kinesis.png';
import looker from '../assets/img/service-icon-looker.png';
import mariadb from '../assets/img/service-icon-mariadb.png';
import metabase from '../assets/img/service-icon-metabase.png';
import mode from '../assets/img/service-icon-mode.png';
import mongodb from '../assets/img/service-icon-mongodb.png';
import mssql from '../assets/img/service-icon-mssql.png';
import nifi from '../assets/img/service-icon-nifi.png';
import oracle from '../assets/img/service-icon-oracle.png';
import pinot from '../assets/img/service-icon-pinot.png';
import postgres from '../assets/img/service-icon-post.png';
import powerbi from '../assets/img/service-icon-power-bi.png';
import prefect from '../assets/img/service-icon-prefect.png';
import presto from '../assets/img/service-icon-presto.png';
import pulsar from '../assets/img/service-icon-pulsar.png';
import query from '../assets/img/service-icon-query.png';
import quicksight from '../assets/img/service-icon-quicksight.png';
import redash from '../assets/img/service-icon-redash.png';
import redpanda from '../assets/img/service-icon-redpanda.png';
import redshift from '../assets/img/service-icon-redshift.png';
import sagemaker from '../assets/img/service-icon-sagemaker.png';
import salesforce from '../assets/img/service-icon-salesforce.png';
import sapHana from '../assets/img/service-icon-sap-hana.png';
import scikit from '../assets/img/service-icon-scikit.png';
import singlestore from '../assets/img/service-icon-singlestore.png';
import snowflakes from '../assets/img/service-icon-snowflakes.png';
import spline from '../assets/img/service-icon-spline.png';
import mysql from '../assets/img/service-icon-sql.png';
import sqlite from '../assets/img/service-icon-sqlite.png';
import superset from '../assets/img/service-icon-superset.png';
import tableau from '../assets/img/service-icon-tableau.png';
import trino from '../assets/img/service-icon-trino.png';
import vertica from '../assets/img/service-icon-vertica.png';
import dashboardDefault from '../assets/svg/dashboard.svg';
import iconDefaultService from '../assets/svg/default-service-icon.svg';
import databaseDefault from '../assets/svg/ic-custom-database.svg';
import mlModelDefault from '../assets/svg/ic-custom-model.svg';
import storageDefault from '../assets/svg/ic-custom-storage.svg';
import logo from '../assets/svg/logo-monogram.svg';
import pipelineDefault from '../assets/svg/pipeline.svg';
import plus from '../assets/svg/plus.svg';
import mlflow from '../assets/svg/service-icon-mlflow.svg';
import topicDefault from '../assets/svg/topic.svg';
import { ServiceCategory } from '../enums/service.enum';
import { DashboardServiceType } from '../generated/entity/services/dashboardService';
import { DatabaseServiceType } from '../generated/entity/services/databaseService';
import { MessagingServiceType } from '../generated/entity/services/messagingService';
import { MetadataServiceType } from '../generated/entity/services/metadataService';
import { MlModelServiceType } from '../generated/entity/services/mlmodelService';
import { PipelineServiceType } from '../generated/entity/services/pipelineService';
import { customServiceComparator } from '../utils/StringsUtils';
import {
  addDBTIngestionGuide,
  addLineageIngestionGuide,
  addMetadataIngestionGuide,
  addProfilerIngestionGuide,
  addUsageIngestionGuide,
} from './service-guide.constant';

export const NoDataFoundPlaceHolder = noDataFound;
export const AddPlaceHolder = addPlaceHolder;
export const MYSQL = mysql;
export const SQLITE = sqlite;
export const MSSQL = mssql;
export const REDSHIFT = redshift;
export const BIGQUERY = query;
export const HIVE = hive;
export const IMPALA = impala;
export const POSTGRES = postgres;
export const ORACLE = oracle;
export const SNOWFLAKE = snowflakes;
export const ATHENA = athena;
export const PRESTO = presto;
export const TRINO = trino;
export const GLUE = glue;
export const MARIADB = mariadb;
export const VERTICA = vertica;
export const KAFKA = kafka;
export const PULSAR = pulsar;
export const REDPANDA = redpanda;
export const SUPERSET = superset;
export const LOOKER = looker;
export const TABLEAU = tableau;
export const REDASH = redash;
export const METABASE = metabase;
export const AZURESQL = azuresql;
export const CLICKHOUSE = clickhouse;
export const DATABRICK = databrick;
export const IBMDB2 = ibmdb2;
export const DRUID = druid;
export const DYNAMODB = dynamodb;
export const SINGLESTORE = singlestore;
export const SALESFORCE = salesforce;
export const MLFLOW = mlflow;
export const SAP_HANA = sapHana;
export const SCIKIT = scikit;
export const DELTALAKE = deltalake;
export const DEFAULT_SERVICE = iconDefaultService;
export const AIRBYTE = airbyte;
export const PINOT = pinot;
export const DATALAKE = datalake;
export const MODE = mode;
export const DAGSTER = dagster;
export const FIVETRAN = fivetran;
export const AMUNDSEN = amundsen;
export const ATLAS = atlas;
export const LOGO = logo;

export const AIRFLOW = airflow;
export const PREFECT = prefect;
export const POWERBI = powerbi;
export const DATABASE_DEFAULT = databaseDefault;
export const TOPIC_DEFAULT = topicDefault;
export const DASHBOARD_DEFAULT = dashboardDefault;
export const PIPELINE_DEFAULT = pipelineDefault;
export const ML_MODEL_DEFAULT = mlModelDefault;
export const CUSTOM_STORAGE_DEFAULT = storageDefault;
export const NIFI = nifi;
export const KINESIS = kinesis;
export const QUICKSIGHT = quicksight;
export const DOMO = domo;
export const SAGEMAKER = sagemaker;
export const AMAZON_S3 = amazonS3;
export const GCS = gcs;
export const MS_AZURE = msAzure;
export const SPLINE = spline;
export const MONGODB = mongodb;

export const PLUS = plus;
export const NOSERVICE = noService;
export const excludedService = [
  MlModelServiceType.Sklearn,
  MetadataServiceType.MetadataES,
  MetadataServiceType.OpenMetadata,
];

export const IGNORED_DB_SERVICES: Array<string> = ['QueryLog', 'Dbt'];

export const serviceTypes: Record<ServiceTypes, Array<string>> = {
  databaseServices: (Object.values(DatabaseServiceType) as string[])
    .filter((key: string) => !IGNORED_DB_SERVICES.includes(key))
    .sort(customServiceComparator),
  messagingServices: (Object.values(MessagingServiceType) as string[]).sort(
    customServiceComparator
  ),
  dashboardServices: (Object.values(DashboardServiceType) as string[]).sort(
    customServiceComparator
  ),
  pipelineServices: (Object.values(PipelineServiceType) as string[]).sort(
    customServiceComparator
  ),
  mlmodelServices: (Object.values(MlModelServiceType) as string[]).sort(
    customServiceComparator
  ),
  metadataServices: (Object.values(MetadataServiceType) as string[]).sort(
    customServiceComparator
  ),
  storageServices: (Object.values(StorageServiceType) as string[]).sort(
    customServiceComparator
  ),
};

export const arrServiceTypes: Array<ServiceTypes> = [
  'databaseServices',
  'messagingServices',
  'dashboardServices',
  'pipelineServices',
  'mlmodelServices',
  'storageServices',
];

export const SERVICE_CATEGORY: { [key: string]: ServiceCategory } = {
  databases: ServiceCategory.DATABASE_SERVICES,
  messaging: ServiceCategory.MESSAGING_SERVICES,
  dashboards: ServiceCategory.DASHBOARD_SERVICES,
  pipelines: ServiceCategory.PIPELINE_SERVICES,
  mlModels: ServiceCategory.ML_MODEL_SERVICES,
  metadata: ServiceCategory.METADATA_SERVICES,
  storages: ServiceCategory.STORAGE_SERVICES,
};

export const SERVICE_CATEGORY_TYPE = {
  databaseServices: 'databases',
  messagingServices: 'messaging',
  dashboardServices: 'dashboards',
  pipelineServices: 'pipelines',
  mlmodelServices: 'mlModels',
  metadataServices: 'metadata',
  storageServices: 'storages',
};

export const servicesDisplayName: { [key: string]: string } = {
  databaseServices: i18n.t('label.entity-service', {
    entity: i18n.t('label.database'),
  }),
  messagingServices: i18n.t('label.entity-service', {
    entity: i18n.t('label.messaging'),
  }),
  dashboardServices: i18n.t('label.entity-service', {
    entity: i18n.t('label.dashboard'),
  }),
  pipelineServices: i18n.t('label.entity-service', {
    entity: i18n.t('label.pipeline'),
  }),
  mlmodelServices: i18n.t('label.entity-service', {
    entity: i18n.t('label.ml-model'),
  }),
  metadataServices: i18n.t('label.entity-service', {
    entity: i18n.t('label.metadata'),
  }),
  storageServices: i18n.t('label.entity-service', {
    entity: i18n.t('label.storage'),
  }),
  dashboardDataModel: i18n.t('label.entity-service', {
    entity: i18n.t('label.data-model'),
  }),
};

export const DEF_UI_SCHEMA = {
  supportsMetadataExtraction: { 'ui:widget': 'hidden', 'ui:hideError': true },
  supportsUsageExtraction: { 'ui:widget': 'hidden', 'ui:hideError': true },
  supportsLineageExtraction: { 'ui:widget': 'hidden', 'ui:hideError': true },
  supportsProfiler: { 'ui:widget': 'hidden', 'ui:hideError': true },
  supportsDatabase: { 'ui:widget': 'hidden', 'ui:hideError': true },
  supportsQueryComment: { 'ui:widget': 'hidden', 'ui:hideError': true },
  supportsDBTExtraction: { 'ui:widget': 'hidden', 'ui:hideError': true },
  type: { 'ui:widget': 'hidden' },
};

export const COMMON_UI_SCHEMA = {
  ...DEF_UI_SCHEMA,
  connection: {
    ...DEF_UI_SCHEMA,
  },
};

export const OPEN_METADATA = 'OpenMetadata';
export const JWT_CONFIG = 'openMetadataJWTClientConfig';

export const SERVICE_CATEGORY_OPTIONS = map(ServiceCategory, (value) => ({
  label: startCase(value),
  value,
}));

export const STEPS_FOR_ADD_SERVICE: Array<StepperStepType> = [
  {
    name: i18n.t('label.select-field', {
      field: i18n.t('label.service-type'),
    }),
    step: 1,
  },
  {
    name: i18n.t('label.configure-entity', {
      entity: i18n.t('label.service'),
    }),
    step: 2,
  },
  {
    name: i18n.t('label.connection-entity', {
      entity: i18n.t('label.detail-plural'),
    }),
    step: 3,
  },
];

export const SERVICE_DEFAULT_ERROR_MAP = {
  serviceType: false,
};
// 2 minutes
export const FETCHING_EXPIRY_TIME = 2 * 60 * 1000;
export const FETCH_INTERVAL = 2000;
export const WORKFLOW_COMPLETE_STATUS = [
  WorkflowStatus.Failed,
  WorkflowStatus.Successful,
];
export const TEST_CONNECTION_PROGRESS_PERCENTAGE = {
  ZERO: 0,
  ONE: 1,
  TEN: 10,
  TWENTY: 20,
  FORTY: 40,
  HUNDRED: 100,
};

export const INGESTION_GUIDE_MAP = {
  [PipelineType.Usage]: addUsageIngestionGuide,
  [PipelineType.Lineage]: addLineageIngestionGuide,
  [PipelineType.Profiler]: addProfilerIngestionGuide,
  [PipelineType.Dbt]: addDBTIngestionGuide,
  [PipelineType.Metadata]: addMetadataIngestionGuide,
};

export const SERVICE_TYPE_MAP = {
  [ServiceCategory.DASHBOARD_SERVICES]: ServiceType.Dashboard,
  [ServiceCategory.DATABASE_SERVICES]: ServiceType.Database,
  [ServiceCategory.MESSAGING_SERVICES]: ServiceType.Messaging,
  [ServiceCategory.ML_MODEL_SERVICES]: ServiceType.MlModel,
  [ServiceCategory.METADATA_SERVICES]: ServiceType.Metadata,
  [ServiceCategory.STORAGE_SERVICES]: ServiceType.Storage,
  [ServiceCategory.PIPELINE_SERVICES]: ServiceType.Pipeline,
};

export const BETA_SERVICES = [
  DatabaseServiceType.Impala,
  PipelineServiceType.Spline,
];

export const TEST_CONNECTION_INITIAL_MESSAGE = i18n.t(
  'message.test-your-connection-before-creating-service'
);

export const TEST_CONNECTION_SUCCESS_MESSAGE = i18n.t(
  'message.connection-test-successful'
);

export const TEST_CONNECTION_FAILURE_MESSAGE = i18n.t(
  'message.connection-test-failed'
);

export const TEST_CONNECTION_TESTING_MESSAGE = i18n.t(
  'message.testing-your-connection-may-take-two-minutes'
);

export const TEST_CONNECTION_INFO_MESSAGE = i18n.t(
  'message.test-connection-taking-too-long'
);

export const TEST_CONNECTION_WARNING_MESSAGE = i18n.t(
  'message.connection-test-warning'
);

export const ADVANCED_PROPERTIES = [
  'connectionArguments',
  'connectionOptions',
  'scheme',
];

export const PIPELINE_SERVICE_PLATFORM = 'Airflow';
